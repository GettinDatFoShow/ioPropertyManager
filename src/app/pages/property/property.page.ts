import { Component } from '@angular/core';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PopoverController } from '@ionic/angular';
import { PropertyService } from '../../services/property/property.service';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage {

  constructor(public popoverController: PopoverController, public propertyService: PropertyService) {

  }

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
