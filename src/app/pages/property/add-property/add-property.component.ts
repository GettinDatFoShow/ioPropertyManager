import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'iopm-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {

  constructor(private _modalService: ModalController) { }

  ngOnInit() {}

  close() {
    this._modalService.dismiss();
  }

}
