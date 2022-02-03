import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'iopm-add-schedule-date',
  templateUrl: './add-schedule-date.component.html',
  styleUrls: ['./add-schedule-date.component.scss'],
})
export class AddScheduleDateComponent implements OnInit {

  today: string = format(new Date(), 'yyyy-mm-ddTHH:mmz');

  constructor() { }

  ngOnInit() {}

}
