import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMedicineModalPage } from './update-medicine-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMedicineModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMedicineModalPageRoutingModule {}
