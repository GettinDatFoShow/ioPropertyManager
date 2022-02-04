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
    { label: 'Home' , route: '/tabs/homeTab/home', icon: 'newspaper-outline'},
    { label: 'Profile', route: '/tabs/homeTab/userProfile',  icon: 'id-card-outline'},
    { label: 'Team Members', route: '/tabs/homeTab/teamMembers',  icon: 'people-outline'},
    { label: 'Subscription', route: 'subscriptionDetails',  icon: 'pricetags-outline'},
    { label: 'Settings', route: '/tabs/homeTab/settings',  icon: 'settings-outline'}
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
