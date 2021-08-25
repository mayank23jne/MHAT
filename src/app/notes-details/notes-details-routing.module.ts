import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesDetailsPage } from './notes-details.page';

const routes: Routes = [
  {
    path: '',
    component: NotesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesDetailsPageRoutingModule {}
