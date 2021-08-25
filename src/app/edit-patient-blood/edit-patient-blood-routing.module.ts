import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPatientBloodPage } from './edit-patient-blood.page';

const routes: Routes = [
  {
    path: '',
    component: EditPatientBloodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPatientBloodPageRoutingModule {}
