import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
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
        redirectTo: '/tabs/homeTab/homeFeed',
        pathMatch: 'full'
      },
      {
        path: 'scheduleHome',
        redirectTo: '/tabs/scheduleTab/scheduleHome',
        pathMatch: 'full'
      },
      {
        path: 'propertiesHome',
        redirectTo: '/tabs/propertiesTab/propertiesHome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homeTab/homeFeed',
    pathMatch: 'full'
  },
  {
    path: 'tabs/homeFeed',
    redirectTo: '/tabs/homeTab/homeFeed',
    pathMatch: 'full'
  },
  {
    path: 'tabs/scheduleHome',
    redirectTo: '/tabs/scheduleTab/scheduleHome',
    pathMatch: 'full'
  },
  {
    path: 'tabs/propertiesHome',
    redirectTo: '/tabs/propertiesTab/propertiesHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
