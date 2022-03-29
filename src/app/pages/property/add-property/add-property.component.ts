import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { CompanyService } from '../../../services/company/company.service';
import { PropertyService } from '../../../services/property/property.service';
import { Company, Property } from '../../../global/models/globals.model';
import { NotificationPopupService } from 'src/app/services/notification-popup/notification-popup.service';

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
    private propertyService: PropertyService,
    private companyService: CompanyService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private notficationPopupService: NotificationPopupService
    ) {
      console.log(this.companyService.getCurrentCompanyId());
      this.companyService.getCompany(this.companyService.getCurrentCompanyId()).subscribe( company => {
        this.company = company;
        console.log('company',company)
      }, async err => {
        console.error(err.message);
        const alert = await this.alertController.create({
          header: ':[', 
          message: 'There was an issue.. please try again', 
          buttons: ['OK']
        });
        await alert.present(); 
      })
     }

  ngOnInit() {
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
    const loading = await this.loadingController.create();
    await loading.present();
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
    await this.propertyService.addProperty(this.property).then(res=>{
      console.log(res);
      this.property.id = res.id;
      this.company.properties.push(this.property);
      this.companyService.updateCompany(this.company).then(res=>{
        console.log(res);
        loading.dismiss();
        this.notficationPopupService.presentToast('Property Created Successfully!', 'success', 'thumbs-up-outline')
      });
    })
  }
}
