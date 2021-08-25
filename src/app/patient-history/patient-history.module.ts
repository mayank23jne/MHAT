import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { PatientHistoryPageRoutingModule } from './patient-history-routing.module';

import { PatientHistoryPage } from './patient-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PatientHistoryPageRoutingModule
  ],
  declarations: [PatientHistoryPage]
})
export class PatientHistoryPageModule {}
