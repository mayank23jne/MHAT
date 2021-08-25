import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { EditPatientBloodPageRoutingModule } from './edit-patient-blood-routing.module';

import { EditPatientBloodPage } from './edit-patient-blood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    EditPatientBloodPageRoutingModule
  ],
  declarations: [EditPatientBloodPage]
})
export class EditPatientBloodPageModule {}
