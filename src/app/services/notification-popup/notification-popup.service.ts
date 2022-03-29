import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationPopupService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: string, icon?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      icon: icon
    });
    toast.present();
  }

}
