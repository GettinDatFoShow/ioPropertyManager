import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddScheduleDateComponent } from '../add-schedule-date/add-schedule-date.component';
import { InputComponent } from '../input/input.component';
import { MapViewComponent } from '../map-view/map-view.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    AddScheduleDateComponent,
    MapViewComponent
  ],
  exports: [
    MapViewComponent
  ]
})
export class SharedComponentsModule { }
