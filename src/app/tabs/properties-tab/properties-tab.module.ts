import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertiesTabPageRoutingModule } from './properties-tab-routing.module';

import { PropertiesTabPage } from './properties-tab.page';
import { SharedModule } from '../../services/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertiesTabPageRoutingModule,
    SharedModule
  ],
  declarations: [PropertiesTabPage]
})
export class PropertiesTabPageModule {}
