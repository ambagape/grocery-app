import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingService } from './loading-service';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async show(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000
    });

    await toast.present();

    return toast;
  }

  handle(error: any) {
    let message = '';
    if (typeof (error) === 'string') {
      message = error;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return this.showError(message);
  }

  dismissToast() {
    this.toastCtrl.dismiss();
  }

  private async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      header: 'Error',
      position: 'bottom',
      buttons: [
        {
          text: 'Okay',
          role: 'ok',
          handler: () => {
            this.dismissToast();

          }
        }
      ]
    });

    await toast.present();

    return toast;
  }
}
