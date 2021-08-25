import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSupervisorFeedbackPage } from './update-supervisor-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSupervisorFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSupervisorFeedbackPageRoutingModule {}
