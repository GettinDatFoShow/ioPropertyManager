import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/global/models/globals.model';
import { NotificationPopupService } from '../../../services/notification-popup/notification-popup.service';

@Component({
  selector: 'iopm-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss'],
})
export class PropertyDisplayComponent implements OnInit {

  @Input() property: Property;
  locationShown: boolean = false;

  constructor(
    private notficationPopupService: NotificationPopupService
  ) { 
  }

  ngOnInit() {}

  viewPhotoClick() {
    this.clickWarning('View Photo');
  }

  locationClick() {
    this.locationShown = !this.locationShown;
    // this.clickWarning('View Location');
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
