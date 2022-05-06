import { Component, OnInit, Input, Output } from '@angular/core';
import { Property } from 'src/app/global/models/globals.model';
import { Feature } from 'src/app/global/models/map';
import { NotificationPopupService } from '../../../services/notification-popup/notification-popup.service';

@Component({
  selector: 'iopm-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss'],
})
export class PropertyDisplayComponent implements OnInit {

  @Input() property: Property;
  locationShown: boolean = false;
  @Output() address: Feature;

  constructor(
    private notficationPopupService: NotificationPopupService
  ) { 
  }

  ngOnInit() {}

  viewPhotoClick() {
    this.clickWarning('View Photo');
  }

  locationClick(address: Feature) {
    this.address = address;
    this.locationShown = !this.locationShown;
  }

  calendarClick() {
    this.clickWarning('View Schedule');
  }

  addOwnerClick() {
    this.clickWarning('View Owners');
  }

  activeClick() {
    this.clickWarning('View Active');
  }

  editClick() {
    this.clickWarning('Edit Property');
  }

  private clickWarning(functionName: string) {
    this.notficationPopupService.clickWarning(functionName);
  }

}
