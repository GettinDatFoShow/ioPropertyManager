import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyPageRoutingModule } from './property-routing.module';

import { PropertyPage } from './property.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { AddPropertyComponent } from './add-property/add-property.component';
import { SharedModule } from '../../services/shared/shared.module';
import { PropertyDisplayComponent } from './property-display/property-display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyPageRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PropertyPage,
    AddPropertyComponent,
    PropertyDisplayComponent
  ],
})
export class PropertyPageModule {}
