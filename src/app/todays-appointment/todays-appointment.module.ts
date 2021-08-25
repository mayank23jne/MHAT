import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { TodaysAppointmentPageRoutingModule } from './todays-appointment-routing.module';

import { TodaysAppointmentPage } from './todays-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TodaysAppointmentPageRoutingModule
  ],
  declarations: [TodaysAppointmentPage]
})
export class TodaysAppointmentPageModule {}
