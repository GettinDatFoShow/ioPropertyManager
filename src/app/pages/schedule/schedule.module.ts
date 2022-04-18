import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { SharedModule } from '../../services/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    SharedComponentsModule,
    SharedModule
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule {}
