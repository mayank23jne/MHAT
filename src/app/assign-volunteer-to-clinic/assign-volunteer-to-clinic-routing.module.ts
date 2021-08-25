import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignVolunteerToClinicPage } from './assign-volunteer-to-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: AssignVolunteerToClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignVolunteerToClinicPageRoutingModule {}
