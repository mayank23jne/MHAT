import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeClinicPage } from './change-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeClinicPageRoutingModule {}
