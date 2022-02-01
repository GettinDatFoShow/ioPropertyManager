import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertiesTabPage } from './properties-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PropertiesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesTabPageRoutingModule {}
