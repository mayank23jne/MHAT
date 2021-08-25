import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentReportPage } from './appointment-report.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentReportPageRoutingModule {}
