import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingCtrl: LoadingController) {}

  async start(message: string = 'Please wait...') {
    const loading = await this.loadingCtrl.create({ message });

    await loading.present();

    return loading;
  }
}
