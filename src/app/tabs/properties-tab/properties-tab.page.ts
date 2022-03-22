import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

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
    { label: 'Subscription', route: '/tabs/homeTab/subscriptionDetails',  icon: 'pricetags-outline'},
    { label: 'Settings', route: '/tabs/homeTab/settings',  icon: 'settings-outline'},
    { label: 'Sign Out', route: '/signOut',  icon: 'log-out-outline'}
  ]

  constructor(
    private _menuController: MenuController, 
    private userService: UserService, 
    private _router: Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._menuController.enable(true, 'propertiesTabMenu')
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
  signOut() {
    this.userService.signOut().then( () => 
      this._router.navigateByUrl('/', { replaceUrl: true })
    );
  }
}
