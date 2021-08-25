import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientBloodPage } from './patient-blood.page';

const routes: Routes = [
  {
    path: '',
    component: PatientBloodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientBloodPageRoutingModule {}
