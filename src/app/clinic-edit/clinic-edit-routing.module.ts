import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicEditPage } from './clinic-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicEditPageRoutingModule {}
