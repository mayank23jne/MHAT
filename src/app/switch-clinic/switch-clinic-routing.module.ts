import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwitchClinicPage } from './switch-clinic.page';

const routes: Routes = [
  {
    path: '',
    component: SwitchClinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchClinicPageRoutingModule {}
