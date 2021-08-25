import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewPrescriptionPage } from './preview-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewPrescriptionPageRoutingModule {}
