import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/commons/loading-service';
import { ToastService } from 'src/app/commons/toast-service';
import { IGroceryService } from '../grocery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  private loadedPicture: string| ArrayBuffer;

  form: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    picture: new FormControl(),
    description: new FormControl(),
    isMarked: new FormControl('',Validators.required)
  });

  constructor(private nav: NavController,    
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private groceryService: IGroceryService) {
  }

  async ngOnInit() {
    const loading = await this.loadingService.start("Loading data");
    try {
      const id = Number.parseInt(this.activatedRoute.snapshot.params.id);
      (await this.groceryService.findGrocery(id)).ifPresent(retrievedGrocery => {
        this.form.setValue(retrievedGrocery);
        this.loadedPicture = retrievedGrocery.picture;
        loading.dismiss();
      });
    } catch (e) {
      if (loading)
        loading.dismiss();
      this.toastService.handle(e);
    }

  }

  handleUpload(event: any) {
    this.loadingService.start("Uploading image").then((loading) => {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({ picture: reader.result });
        this.loadedPicture = reader.result;
        loading.dismiss();
      };
    });

  }

  async onSubmit() {
    let loading = null;
    try {
      loading = await this.loadingService.start();
      await this.groceryService.updateGrocery(this.form.value);
      this.toastService.show('Grocery was updated successfully');
      loading.dismiss();
      this.nav.pop();
    } catch (e) {
      if (loading)
        loading.dismiss();
      this.toastService.handle(e)
    }
  }

  picture() {
    return this.form.get("picture");
  }

  title() {
    return this.form.get("title");
  }
}
