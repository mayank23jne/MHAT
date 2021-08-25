import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoMorbidityPage } from './co-morbidity.page';

const routes: Routes = [
  {
    path: '',
    component: CoMorbidityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoMorbidityPageRoutingModule {}
