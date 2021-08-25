import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedPatientListPage } from './assigned-patient-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedPatientListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedPatientListPageRoutingModule {}
