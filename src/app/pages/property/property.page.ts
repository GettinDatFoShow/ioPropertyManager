import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage {

  constructor(public popoverController: PopoverController) {}

  async addProperty(ev: any) {
    const popover = await this.popoverController.create({
      component: AddPropertyComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
