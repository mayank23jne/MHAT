import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodaysAppointmentPage } from './todays-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: TodaysAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaysAppointmentPageRoutingModule {}
