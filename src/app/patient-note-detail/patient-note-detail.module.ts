import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientNoteDetailPageRoutingModule } from './patient-note-detail-routing.module';

import { PatientNoteDetailPage } from './patient-note-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientNoteDetailPageRoutingModule
  ],
  declarations: [PatientNoteDetailPage]
})
export class PatientNoteDetailPageModule {}
