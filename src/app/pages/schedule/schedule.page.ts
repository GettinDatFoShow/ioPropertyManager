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
  today: Date = new Date();
  exDate: Date = new Date('Wed May 18 2022 14:00:00 GMT-0400');
  exDate1: Date = new Date('Mon Jun 13 2022 09:00:00 GMT-0400');
  exDate2: Date = new Date('Fri Jun 24 2022 10:00:00 GMT-0400');
  exDate3: Date = new Date('Thu Jul 28 2022 13:00:00 GMT-0400');

  
  constructor(public popoverController: PopoverController){}

  ngOnInit() {
    console.log(this.today);
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
