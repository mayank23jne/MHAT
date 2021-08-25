import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentListPage } from './sent-list.page';

const routes: Routes = [
  {
    path: '',
    component: SentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentListPageRoutingModule {}
