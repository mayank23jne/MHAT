import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianWisePatientListPageRoutingModule } from './clinician-wise-patient-list-routing.module';

import { ClinicianWisePatientListPage } from './clinician-wise-patient-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicianWisePatientListPageRoutingModule
  ],
  declarations: [ClinicianWisePatientListPage]
})
export class ClinicianWisePatientListPageModule {}
