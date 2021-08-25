import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerAppointmentListPage } from './volunteer-appointment-list.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerAppointmentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerAppointmentListPageRoutingModule {}
