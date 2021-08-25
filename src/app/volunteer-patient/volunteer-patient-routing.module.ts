import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerPatientPage } from './volunteer-patient.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerPatientPageRoutingModule {}
