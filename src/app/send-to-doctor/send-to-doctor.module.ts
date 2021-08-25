import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendToDoctorPageRoutingModule } from './send-to-doctor-routing.module';

import { SendToDoctorPage } from './send-to-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendToDoctorPageRoutingModule
  ],
  declarations: [SendToDoctorPage]
})
export class SendToDoctorPageModule {}
