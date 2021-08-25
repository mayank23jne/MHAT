import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { ChangeClinicPageRoutingModule } from './change-clinic-routing.module';

import { ChangeClinicPage } from './change-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ChangeClinicPageRoutingModule
  ],
  declarations: [ChangeClinicPage]
})
export class ChangeClinicPageModule {}
