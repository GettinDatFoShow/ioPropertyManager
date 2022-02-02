import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-properties-tab',
  templateUrl: './properties-tab.page.html',
  styleUrls: ['./properties-tab.page.scss'],
})
export class PropertiesTabPage implements OnInit {

  menuTitle = 'Extras';
  menuList = [
    { label: 'Home' , route: 'tab/homeFeed'},
    { label: 'Profile', route: 'tab/homeTab/profile'},
    { label: 'Team Members', route: 'tab/homeTab/teamMembers'},
    { label: 'Serberships', route: 'tab/homeTab/subscriptions'},
    { label: 'Settings', route: 'tab/homeTab/settings'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
