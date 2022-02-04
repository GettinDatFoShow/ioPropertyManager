import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'iopm-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  paneEnabled: boolean = true;
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
    this.paneEnabled = true;
    this.menuController.enable(true, 'homeTabMenu')
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
