import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
import { Property } from '../../../global/models/globals.model';
import { PropertyInfoService } from '../property-info/property-info.service';

@Component({
  selector: 'iopm-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {

  public property: Property;
  public propertyForm: FormGroup;

  constructor(
    private _modalService: ModalController,
    private _fb: FormBuilder, 
    private _propertyService: PropertyInfoService,
    private _companyService: CompanyService,
    private _userService: UserService
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
    })
  }

  close() {
    this._modalService.dismiss();
  }

  async addProperty() {
    this.property = {
      type: this.propertyForm.get('propertyType').value,
      added: new Date(),
      active: true,
      propertyName: this.propertyForm.get('name').value,
      description: this.propertyForm.get('description').value,
      location: {
        street: this.propertyForm.get('street').value,
        city: this.propertyForm.get('city').value,
        state: this.propertyForm.get('state').value,
        zip: this.propertyForm.get('zip').value
      }
    }
    await this._propertyService.addProperty(this.property).then(res=>{
      console.log(res);
      // const company = this._userService.getUz
      // async this._companyService.updateCompany(thisl)
    })
  }
}
