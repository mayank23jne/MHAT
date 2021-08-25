import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignDoctorListPage } from './assign-doctor-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssignDoctorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignDoctorListPageRoutingModule {}
