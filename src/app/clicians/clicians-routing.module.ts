import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CliciansPage } from './clicians.page';

const routes: Routes = [
  {
    path: '',
    component: CliciansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CliciansPageRoutingModule {}
