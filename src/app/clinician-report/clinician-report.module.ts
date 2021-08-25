import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianReportPageRoutingModule } from './clinician-report-routing.module';

import { ClinicianReportPage } from './clinician-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicianReportPageRoutingModule
  ],
  declarations: [ClinicianReportPage]
})
export class ClinicianReportPageModule {}
