import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CliniciansPage } from './clinicians.page';

const routes: Routes = [
  {
    path: '',
    component: CliniciansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CliniciansPageRoutingModule {}
