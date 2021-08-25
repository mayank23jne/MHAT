import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescheduleAppointmentPage } from './reschedule-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: RescheduleAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RescheduleAppointmentPageRoutingModule {}
