import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/commons/loading-service';
import { ToastService } from 'src/app/commons/toast-service.service';
import { IGroceryService } from '../grocery.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage {

  private grocery: any = {};

  constructor(
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private groceryService: IGroceryService,
    private toastService: ToastService,
    private loadingService: LoadingService) { }

  async ionViewWillEnter() {
    const loading = await this.loadingService.start("Loading data");
    try {
      const id: number = Number.parseInt(this.activatedRoute.snapshot.params.id);
      let optionalGrocery = await this.groceryService.findGrocery(id);
      optionalGrocery.ifPresentOrElse(retrievedGrocery => {
        this.grocery = retrievedGrocery;
      }, () => this.toastService.show("No such item"));
    } catch (e) {
      this.toastService.handle(e);
    } finally {
      loading.dismiss();
    }

  }


  async toggleItemSelection() {
    let loading = this.loadingService.start("Updating item...");
    try {
      let toggledGrocery = await this.groceryService.toggleGrocerySelection(this.grocery.id);
      toggledGrocery.ifPresent(item => this.grocery = item);
    } catch (e) {
      this.toastService.handle(e);
    } finally {
      (await loading).dismiss();
    }
  }

  goToEdit(id: number) {
    this.nav.navigateForward(`/edit/${id}`)
  }

}
