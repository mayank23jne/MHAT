import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianAddPage } from './clinician-add.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianAddPageRoutingModule {}
