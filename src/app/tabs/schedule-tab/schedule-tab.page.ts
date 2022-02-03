import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'iopm-schedule-tab',
  templateUrl: './schedule-tab.page.html',
  styleUrls: ['./schedule-tab.page.scss'],
})
export class ScheduleTabPage implements OnInit {
  paneEnabled: boolean = false;
  menuTitle = 'Extras';
  menuList = [
    { label: 'Home' , route: '/tabs/homeTab/home'},
    { label: 'Profile', route: '/tabs/homeTab/userProfile'},
    { label: 'Team Members', route: '/tabs/homeTab/teamMembers'},
    // { label: 'Serberships', route: '/tabs/homeTab/subscriptions'},
    { label: 'Settings', route: '/tabs/homeTab/settings'}
  ]

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'scheduleTabMenu')
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

}
