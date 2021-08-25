import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignVolunteerToClinicPageRoutingModule } from './assign-volunteer-to-clinic-routing.module';

import { AssignVolunteerToClinicPage } from './assign-volunteer-to-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignVolunteerToClinicPageRoutingModule
  ],
  declarations: [AssignVolunteerToClinicPage]
})
export class AssignVolunteerToClinicPageModule {}
