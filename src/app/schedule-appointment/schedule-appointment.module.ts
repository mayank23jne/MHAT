import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerModule} from
    '@logisticinfotech/ionic4-datepicker';
import { ScheduleAppointmentPageRoutingModule } from './schedule-appointment-routing.module';

import { ScheduleAppointmentPage } from './schedule-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
	Ionic4DatepickerModule,
    ScheduleAppointmentPageRoutingModule
  ],
  declarations: [ScheduleAppointmentPage]
})
export class ScheduleAppointmentPageModule {}
