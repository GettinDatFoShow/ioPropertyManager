import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'iopm-properties-tab',
  templateUrl: './properties-tab.page.html',
  styleUrls: ['./properties-tab.page.scss'],
})
export class PropertiesTabPage implements OnInit {
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
    this.menuController.enable(true, 'propertiesTabMenu')
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
