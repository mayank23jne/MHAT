import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { VolunteerAppointmentPageRoutingModule } from './volunteer-appointment-routing.module';

import { VolunteerAppointmentPage } from './volunteer-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    VolunteerAppointmentPageRoutingModule
  ],
  declarations: [VolunteerAppointmentPage]
})
export class VolunteerAppointmentPageModule {}
