import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientFormPageRoutingModule } from './patient-form-routing.module';

import { PatientFormPage } from './patient-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientFormPageRoutingModule
  ],
  declarations: [PatientFormPage]
})
export class PatientFormPageModule {}
