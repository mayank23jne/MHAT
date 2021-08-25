import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerAppointmentListPageRoutingModule } from './volunteer-appointment-list-routing.module';

import { VolunteerAppointmentListPage } from './volunteer-appointment-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerAppointmentListPageRoutingModule
  ],
  declarations: [VolunteerAppointmentListPage]
})
export class VolunteerAppointmentListPageModule {}
