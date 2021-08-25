import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorAppointmentReportPageRoutingModule } from './doctor-appointment-report-routing.module';

import { DoctorAppointmentReportPage } from './doctor-appointment-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorAppointmentReportPageRoutingModule
  ],
  declarations: [DoctorAppointmentReportPage]
})
export class DoctorAppointmentReportPageModule {}
