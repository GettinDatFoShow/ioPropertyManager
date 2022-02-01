import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleTabPageRoutingModule } from './schedule-tab-routing.module';

import { ScheduleTabPage } from './schedule-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleTabPageRoutingModule
  ],
  declarations: [ScheduleTabPage]
})
export class ScheduleTabPageModule {}
