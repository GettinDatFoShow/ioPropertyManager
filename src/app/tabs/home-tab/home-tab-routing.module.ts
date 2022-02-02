import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabPage } from './home-tab.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabPage,
    children: [
      {
        path: 'homeFeed',
        loadChildren: () => import('../../pages/home-feed/home-feed.module').then( m => m.HomeFeedPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'subscriptionDetails',
        loadChildren: () => import('../../pages/subscription-details/subscription-details.module').then( m => m.SubscriptionDetailsPageModule)
      },
      {
        path: 'teamMembers',
        loadChildren: () => import('../../pages/team-members/team-members.module').then( m => m.TeamMembersPageModule)
      },
      {
        path: 'userProfile',
        loadChildren: () => import('../../pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/homeTab/homeFeed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/homeTab/homeFeed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabPageRoutingModule {}
