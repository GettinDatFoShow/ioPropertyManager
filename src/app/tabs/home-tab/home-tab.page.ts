import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  menuTitle = 'Extras';
  homeFeedList = [
    { label: 'Home' , route: ''},
    { label: 'Profile', route: ''},
    { label: 'Team Members', route: ''},
    { label: 'Merberships', route: ''},
    { label: 'Settings', route: ''}
  ]
  constructor() { }

  ngOnInit() {
  }

}
