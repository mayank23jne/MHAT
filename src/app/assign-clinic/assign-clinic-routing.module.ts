import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignClinicPage } from './assign-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: AssignClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignClinicPageRoutingModule {}
