import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddScheduleDateComponent } from 'src/app/components/add-schedule-date/add-schedule-date.component';

@Component({
  selector: 'iopm-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  
  isPopoverOpen: boolean = false;

  constructor(public popoverController: PopoverController){}

  ngOnInit() {
  }

  addEvent() {
    // this.isPopoverOpen = true;
    this.presentPopover('add schedule');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddScheduleDateComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  popoverClosed() {
    this.isPopoverOpen = false;
    console.log('POPOVER CLOSED')
  }


}
