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
    { label: 'Home' , route: '/tabs/homeTab/home'},
    { label: 'Profile', route: '/tabs/homeTab/userProfile'},
    { label: 'Team Members', route: '/tabs/homeTab/teamMembers'},
    // { label: 'Serberships', route: 'subscriptionDetails'},
    { label: 'Settings', route: '/tabs/homeTab/settings'}
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
