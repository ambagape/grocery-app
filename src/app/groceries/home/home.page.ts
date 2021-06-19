import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/commons/loading-service';
import { IGrocery } from 'src/app/models/grocery';
import { IGroceryService } from '../grocery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  private groceries: Array<IGrocery> = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private service: IGroceryService, private loadingService: LoadingService) { }  

  ionViewWillEnter(){
    this.init();
  }

  async init(){
    const loading = this.loadingService.start();
    this.groceries = await this.service.getGroceries();
    (await loading).dismiss();
  }

}
