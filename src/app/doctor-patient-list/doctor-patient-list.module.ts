import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPatientListPageRoutingModule } from './doctor-patient-list-routing.module';

import { DoctorPatientListPage } from './doctor-patient-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPatientListPageRoutingModule
  ],
  declarations: [DoctorPatientListPage]
})
export class DoctorPatientListPageModule {}
