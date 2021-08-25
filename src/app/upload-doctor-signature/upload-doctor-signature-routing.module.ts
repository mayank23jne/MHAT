import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDoctorSignaturePage } from './upload-doctor-signature.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDoctorSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDoctorSignaturePageRoutingModule {}
