import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AssignClinicPageRoutingModule } from './assign-clinic-routing.module';

import { AssignClinicPage } from './assign-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    IonicSelectableModule,
    AssignClinicPageRoutingModule
  ],
  declarations: [AssignClinicPage]
})
export class AssignClinicPageModule {}
