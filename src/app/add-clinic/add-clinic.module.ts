import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AddClinicPageRoutingModule } from './add-clinic-routing.module';

import { AddClinicPage } from './add-clinic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddClinicPageRoutingModule
  ],
  declarations: [AddClinicPage]
})
export class AddClinicPageModule {}
