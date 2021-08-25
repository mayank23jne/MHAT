import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotesDetailsPageRoutingModule } from './notes-details-routing.module';
import { NotesDetailsPage } from './notes-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesDetailsPageRoutingModule
  ],
  declarations: [NotesDetailsPage]
})
export class NotesDetailsPageModule {}
