import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewPrescriptionPageRoutingModule } from './preview-prescription-routing.module';

import { PreviewPrescriptionPage } from './preview-prescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewPrescriptionPageRoutingModule
  ],
  declarations: [PreviewPrescriptionPage]
})
export class PreviewPrescriptionPageModule {}
