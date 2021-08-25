import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUpcomingAppointmentPageRoutingModule } from './view-upcoming-appointment-routing.module';

import { ViewUpcomingAppointmentPage } from './view-upcoming-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUpcomingAppointmentPageRoutingModule
  ],
  declarations: [ViewUpcomingAppointmentPage]
})
export class ViewUpcomingAppointmentPageModule {}
