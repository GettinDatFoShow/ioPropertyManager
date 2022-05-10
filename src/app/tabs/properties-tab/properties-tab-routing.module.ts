import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PropertiesTabPage } from './properties-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PropertiesTabPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home-feed/home-feed.module').then( m => m.HomeFeedPageModule),
        pathMatch: 'full'
      },
      {
        path: 'propertiesHome',
        loadChildren: () => import('../../pages/property/property.module').then( m => m.PropertyPageModule)
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
        path: 'company',
        loadChildren: () => import('../../pages/company/company.module').then( m => m.CompanyPageModule),
        pathMatch: 'full'
      },
      {
        path: 'userProfile',
        loadChildren: () => import('../../pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'propertiesHome',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: 'propertiesHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesTabPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
