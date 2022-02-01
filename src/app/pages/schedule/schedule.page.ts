import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'iopm-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  
  ngOnInit() {
  }

  addEvent() {
    alert('Add Schedule Event Clicked!');
  }

}
