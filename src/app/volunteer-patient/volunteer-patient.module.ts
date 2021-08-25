import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerPatientPageRoutingModule } from './volunteer-patient-routing.module';

import { VolunteerPatientPage } from './volunteer-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerPatientPageRoutingModule
  ],
  declarations: [VolunteerPatientPage]
})
export class VolunteerPatientPageModule {}
