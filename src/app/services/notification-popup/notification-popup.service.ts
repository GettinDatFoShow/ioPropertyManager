import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationPopupService {

  private loading: HTMLIonLoadingElement;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
    ) { }

  async presentToast(message: string, color: string, icon?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      icon: icon
    });
    await toast.present();
  }

  async showLoading(message: string) {
    this.loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 1000,
      message: message,
      translucent: true,
      keyboardClose: true,
      animated: true
    });
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }

}
