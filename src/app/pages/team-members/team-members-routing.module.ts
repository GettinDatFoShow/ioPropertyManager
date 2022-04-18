import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { TeamMembersPage } from './team-members.page';

const routes: Routes = [
  {
    path: '',
    component: TeamMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamMembersPageRoutingModule {
  preloadingStrategy: PreloadAllModules
}
