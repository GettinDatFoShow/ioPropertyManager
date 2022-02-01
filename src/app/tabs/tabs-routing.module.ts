import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-tab',
        loadChildren: () => import('./home-tab/home-tab.module').then( m => m.HomeTabPageModule)
      },
      {
        path: 'properties-tab',
        loadChildren: () => import('./properties-tab/properties-tab.module').then( m => m.PropertiesTabPageModule)
      },
      {
        path: 'schedule-tab',
        loadChildren: () => import('./schedule-tab/schedule-tab.module').then( m => m.ScheduleTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
