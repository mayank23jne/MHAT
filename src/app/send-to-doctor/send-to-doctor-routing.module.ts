import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendToDoctorPage } from './send-to-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: SendToDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendToDoctorPageRoutingModule {}
