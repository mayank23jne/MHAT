import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileUpdateLogPage } from './profile-update-log.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileUpdateLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileUpdateLogPageRoutingModule {}
