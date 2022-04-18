import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ScheduleTabPage } from './schedule-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleTabPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/schedule/schedule.module').then( m => m.SchedulePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'teamMembers',
        loadChildren: () => import('../../pages/team-members/team-members.module').then( m => m.TeamMembersPageModule)
      },
      {
        path: 'subscriptionDetails',
        loadChildren: () => import('../../pages/subscription-details/subscription-details.module').then( m => m.SubscriptionDetailsPageModule)
      },
      {
        path: 'userProfile',
        loadChildren: () => import('../../pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'scheduleHome',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'scheduleHome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleTabPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
