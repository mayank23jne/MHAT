import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignVolunteerClinicPage } from './assign-volunteer-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: AssignVolunteerClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignVolunteerClinicPageRoutingModule {}
