import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  menuTitle = 'Extras';
  menuList = [
    { label: 'Home' , route: 'homeFeed'},
    { label: 'Profile', route: 'userProfile'},
    { label: 'Team Members', route: 'teamMembers'},
    { label: 'Serberships', route: 'subscriptionDetails'},
    { label: 'Settings', route: 'settings'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
