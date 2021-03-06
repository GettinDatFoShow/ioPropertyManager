import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeFeedPage } from './home-feed.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFeedPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
