import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPropertyComponent } from './add-property/add-property.component';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async addProperty() {
    const modal = await this.modalController.create({
      component: AddPropertyComponent,
    });
    return await modal.present();
  }

}
