import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUpcomingAppointmentPage } from './view-upcoming-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUpcomingAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUpcomingAppointmentPageRoutingModule {}
