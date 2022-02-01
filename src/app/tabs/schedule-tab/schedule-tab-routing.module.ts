import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleTabPage } from './schedule-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleTabPageRoutingModule {}
