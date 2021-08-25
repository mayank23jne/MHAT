import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianReportPage } from './clinician-report.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianReportPageRoutingModule {}
