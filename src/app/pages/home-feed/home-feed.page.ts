import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-home-feed',
  templateUrl: './home-feed.page.html',
  styleUrls: ['./home-feed.page.scss'],
})
export class HomeFeedPage implements OnInit {

  companyTitle = 'KB Homes'; // name will be pulled from user when used to sign up. 

  constructor() { }

  ngOnInit() {
  }

}
