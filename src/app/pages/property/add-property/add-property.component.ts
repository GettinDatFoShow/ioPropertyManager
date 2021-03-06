import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CompanyService } from '../../../services/company/company.service';
import { Company, Property } from '../../../global/models/globals.model';
import { NotificationPopupService } from 'src/app/services/notification-popup/notification-popup.service';
import { UserService } from '../../../services/user/user.service';
import { Feature } from '../../../global/models/map';
import { MapService } from '../../../services/map-service/map.service';

@Component({
  selector: 'iopm-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {

  public company: Company;
  public property: Property;
  public propertyForm: FormGroup;
  public propertyTypes: string[] = [
    'Single Family Home',
    'Multi-Family Complex',
    'Community'
  ]
  @Output() selectedFullAddress: Feature = null;
  searchAddressShown: boolean = false;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder, 
    private companyService: CompanyService,
    private notficationPopupService: NotificationPopupService,
    private userService: UserService, 
    private mapService: MapService
    ) {
     }

  ngOnInit() {
    this.getCompany();
    this.propertyForm = this.fb.group({
      propertyType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['']
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
      location: this.selectedFullAddress
    }
    if (!!this.company.properties) {
      this.company.properties.push(this.property);
    } else {
      this.company.properties = [this.property];
    }
    await this.companyService.updateCompany(this.company).then((value)=> {
      // this.notficationPopupService.closeLoading();
      this.close();
      this.notficationPopupService.presentToast('Successfully added new property!', 'success', 'thumbs-up-outline');
    })
  }

  getCompany() {
    this.companyService.getCompany(this.userService.currentUser.companyId).subscribe((company: Company)=>{
      this.company = company;
    })
  }

  userPropertyType(event: any): void {
    this.propertyForm.value['propertyType'] = event.detail.value;
  }

  onAddressSelection(address: Feature) {
    this.selectedFullAddress = address;
    this.propertyForm.value['location'] = this.selectedFullAddress;
    this.searchAddressShown = false;
  }

  showAddressSearch() {
    this.searchAddressShown = true;
  }

  removeAddress() {
    this.selectedFullAddress = null;
    this.searchAddressShown = true;
  }

  shortenAddress(placeName: string) {
    return this.mapService.shortenAddress(placeName);
  }
}
