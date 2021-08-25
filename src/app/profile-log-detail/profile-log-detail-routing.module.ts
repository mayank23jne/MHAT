import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileLogDetailPage } from './profile-log-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileLogDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileLogDetailPageRoutingModule {}
