import { Component } from '@angular/core';
import { LoadingService } from 'src/app/commons/loading-service';
import { ToastService } from 'src/app/commons/toast-service';
import { IGrocery } from 'src/app/models/grocery';
import { IGroceryService } from '../grocery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  private _groceries: Array<IGrocery> = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private service: IGroceryService, private loadingService: LoadingService, private toastService: ToastService) { }

  ionViewWillEnter() {
    this.init();
  }

  async init() {
    const loading = this.loadingService.start();
    this._groceries = await this.service.getGroceries();
    (await loading).dismiss();
  }

  async toggleItemSelection(id) {
    let loading = await this.loadingService.start("Updating item...");
    try {
      await this.service.toggleGrocerySelection(id);
      await this.service.getGroceries();
    } catch (e) {
      this.toastService.handle(e);
    } finally {
      (await loading).dismiss();
    }
  }

  get groceries() {
    return this._groceries;
  };
}
