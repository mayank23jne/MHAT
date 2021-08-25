import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignVolunteerPage } from './assign-volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: AssignVolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignVolunteerPageRoutingModule {}
