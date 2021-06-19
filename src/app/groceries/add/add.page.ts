import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { LoadingService } from 'src/app/commons/loading-service';
import { ToastService } from 'src/app/commons/toast-service.service';
import { GroceryService } from '../grocery.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  
  private loadedPicture: string | ArrayBuffer;

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    picture: new FormControl(),
    description: new FormControl()
  });

  constructor(private nav: NavController,
    private base64: Base64,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private groceryService: GroceryService) {

  }

  handleUpload(event: any) {
    this.loadingService.start("Uploading image").then((loading)=>{
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {          
          this.form.patchValue({picture: reader.result});
          this.loadedPicture = reader.result;          
          loading.dismiss();
      };
    });
    
  }
  
  async onSubmit() {
    let loading = null;
    try {
      loading = await this.loadingService.start();
      await this.groceryService.addGrocery(this.form.value);
      this.toastService.show('Grocery was created successfully');
      loading.dismiss();
      this.nav.navigateRoot("/home");
    } catch (e) {
      if (loading)
        loading.dismiss();
      this.toastService.handle(e)
    }
  }

  picture(){
    return this.form.get("picture");
  }

  title(){
    return this.form.get("title");
  }
  
}
