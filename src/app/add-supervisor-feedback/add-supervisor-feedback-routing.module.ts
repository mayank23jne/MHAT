import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSupervisorFeedbackPage } from './add-supervisor-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: AddSupervisorFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSupervisorFeedbackPageRoutingModule {}
