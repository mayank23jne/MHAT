import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientNoteDetailPage } from './patient-note-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PatientNoteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientNoteDetailPageRoutingModule {}
