import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { SwitchClinicPageRoutingModule } from './switch-clinic-routing.module';

import { SwitchClinicPage } from './switch-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SwitchClinicPageRoutingModule
  ],
  declarations: [SwitchClinicPage]
})
export class SwitchClinicPageModule {}
