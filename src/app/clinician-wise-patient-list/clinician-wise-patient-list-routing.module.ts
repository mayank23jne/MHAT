import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianWisePatientListPage } from './clinician-wise-patient-list.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianWisePatientListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianWisePatientListPageRoutingModule {}
