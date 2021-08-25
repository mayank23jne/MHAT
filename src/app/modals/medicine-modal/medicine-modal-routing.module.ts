import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineModalPage } from './medicine-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineModalPageRoutingModule {}
