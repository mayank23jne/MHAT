import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddPrescriptionPageRoutingModule } from './add-prescription-routing.module';

import { AddPrescriptionPage } from './add-prescription.page';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    IonicSelectableModule,
    AddPrescriptionPageRoutingModule
  ],
  declarations: [AddPrescriptionPage]
})
export class AddPrescriptionPageModule {}
