import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addProperty() {
    alert('Add Property Clicked!')
  }

}
