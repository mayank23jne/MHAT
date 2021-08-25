import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineListPage } from './medicine-list.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineListPageRoutingModule {}
