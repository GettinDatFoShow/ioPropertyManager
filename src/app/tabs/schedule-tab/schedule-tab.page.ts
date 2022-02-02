import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-schedule-tab',
  templateUrl: './schedule-tab.page.html',
  styleUrls: ['./schedule-tab.page.scss'],
})
export class ScheduleTabPage implements OnInit {

  menuTitle = 'Extras';
  menuList = [
    { label: 'Home' , route: 'tabs/homeFeed'},
    { label: 'Profile', route: 'tabs/homeTab/profile'},
    { label: 'Team Members', route: 'tabs/homeTab/teamMembers'},
    { label: 'Serberships', route: 'tabs/homeTab/subscriptions'},
    { label: 'Settings', route: 'tabs/homeTab/settings'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
