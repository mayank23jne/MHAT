import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { PatientDetailsPageRoutingModule } from './patient-details-routing.module';

import { PatientDetailsPage } from './patient-details.page';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PatientDetailsPageRoutingModule
  ],
  declarations: [PatientDetailsPage]
})
export class PatientDetailsPageModule {}
