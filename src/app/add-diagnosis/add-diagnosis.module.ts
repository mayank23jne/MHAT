import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AddDiagnosisPageRoutingModule } from './add-diagnosis-routing.module';

import { AddDiagnosisPage } from './add-diagnosis.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddDiagnosisPageRoutingModule
  ],
  declarations: [AddDiagnosisPage]
})
export class AddDiagnosisPageModule {}
