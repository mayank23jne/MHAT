import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditClinicianPage } from './edit-clinician.page';

const routes: Routes = [
  {
    path: '',
    component: EditClinicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditClinicianPageRoutingModule {}
