import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddScheduleDateComponent } from '../add-schedule-date/add-schedule-date.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { AddressSearchMapComponent } from '../address-search-map/address-search-map.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    AddScheduleDateComponent,
    MapViewComponent,
    AddressSearchMapComponent
  ],
  exports: [
    MapViewComponent,
    AddScheduleDateComponent,
    AddressSearchMapComponent
  ]
})
export class SharedComponentsModule { }
