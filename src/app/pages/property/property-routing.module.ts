import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PropertyPage } from './property.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
