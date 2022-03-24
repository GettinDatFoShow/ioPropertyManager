import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'iopm-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {

  // propertyForm: 
  public propertyForm: FormGroup;

  constructor(
    private _modalService: ModalController,
    private _fb: FormBuilder, 
    ) { }

  ngOnInit() {
    this.propertyForm = this._fb.group({
      propertyType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      // ownerFirstName: ['', [Validators.required]],
      // ownerLastName: ['', [Validators.required]],
      // contactPhone: ['', [Validators.required, Validators.minLength(8)]],
      // propertyOwner: ['',[Validators.required]]
    })
  }

  close() {
    this._modalService.dismiss();
  }

  // this.companyForm = this._fb.group({
  //   email: ['', [Validators.email]],
  //   zip: ['', [Validators.required]],
  //   street: ['', [Validators.required]],
  //   state: ['', [Validators.required]],
  //   phone: ['', [Validators.required, Validators.minLength(8)]],
  //   city: ['', [Validators.required]],
  //   website: [''],
  // })

}
