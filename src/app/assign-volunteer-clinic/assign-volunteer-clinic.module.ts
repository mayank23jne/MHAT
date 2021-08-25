import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AssignVolunteerClinicPageRoutingModule } from './assign-volunteer-clinic-routing.module';

import { AssignVolunteerClinicPage } from './assign-volunteer-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    AssignVolunteerClinicPageRoutingModule
  ],
  declarations: [AssignVolunteerClinicPage]
})
export class AssignVolunteerClinicPageModule {}
