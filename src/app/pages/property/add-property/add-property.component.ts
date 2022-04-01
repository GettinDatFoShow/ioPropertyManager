import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CompanyService } from '../../../services/company/company.service';
import { Company, Property } from '../../../global/models/globals.model';
import { NotificationPopupService } from 'src/app/services/notification-popup/notification-popup.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'iopm-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {

  public company: Company;
  public property: Property;
  public propertyForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder, 
    private companyService: CompanyService,
    private notficationPopupService: NotificationPopupService,
    private userService: UserService
    ) {
     }

  ngOnInit() {
    console.log(this.userService.currentUser)
    this.getCompany();
    this.propertyForm = this.fb.group({
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
    this.modalController.dismiss();
  }

  async addProperty() {
    // this.notficationPopupService.showLoading('Creating new poperty...');
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
    if (!!this.company.properties) {
      this.company.properties.push(this.property);
    } else {
      this.company.properties = [this.property];
    }
    await this.companyService.updateCompany(this.company).then((value)=> {
      console.log(value);
      // this.notficationPopupService.closeLoading();
      this.notficationPopupService.presentToast('Successfully added new property!', 'success', 'thumbs-up-outline');
      this.close();
    })
  }

  getCompany() {
    this.companyService.getCompany(this.userService.currentUser.companyId).subscribe((company: Company)=>{
      console.log('GETTING COMPANY')
      console.log(company);
      this.company = company;
    })
  }
}
