import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentReportPageRoutingModule } from './appointment-report-routing.module';

import { AppointmentReportPage } from './appointment-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentReportPageRoutingModule
  ],
  declarations: [AppointmentReportPage]
})
export class AppointmentReportPageModule {}
