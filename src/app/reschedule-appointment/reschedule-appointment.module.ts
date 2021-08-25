import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RescheduleAppointmentPageRoutingModule } from './reschedule-appointment-routing.module';

import { RescheduleAppointmentPage } from './reschedule-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RescheduleAppointmentPageRoutingModule
  ],
  declarations: [RescheduleAppointmentPage]
})
export class RescheduleAppointmentPageModule {}
