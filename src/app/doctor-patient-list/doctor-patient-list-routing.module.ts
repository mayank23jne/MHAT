import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPatientListPage } from './doctor-patient-list.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPatientListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPatientListPageRoutingModule {}
