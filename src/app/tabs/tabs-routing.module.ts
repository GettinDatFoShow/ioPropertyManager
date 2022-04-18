import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'homeTab',
        loadChildren: () => import('./home-tab/home-tab.module').then( m => m.HomeTabPageModule)
      },
      {
        path: 'propertiesTab',
        loadChildren: () => import('./properties-tab/properties-tab.module').then( m => m.PropertiesTabPageModule)
      },
      {
        path: 'scheduleTab',
        loadChildren: () => import('./schedule-tab/schedule-tab.module').then( m => m.ScheduleTabPageModule)
      },
      {
        path: '',
        redirectTo: 'homeTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
