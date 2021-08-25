import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClinicPage } from './add-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: AddClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClinicPageRoutingModule {}
