import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadSignaturePage } from './upload-signature.page';

const routes: Routes = [
  {
    path: '',
    component: UploadSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadSignaturePageRoutingModule {}
