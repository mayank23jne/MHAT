import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { PatientBloodPageRoutingModule } from './patient-blood-routing.module';

import { PatientBloodPage } from './patient-blood.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PatientBloodPageRoutingModule
  ],
  declarations: [PatientBloodPage]
})
export class PatientBloodPageModule {}
