import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDoctorSignaturePageRoutingModule } from './upload-doctor-signature-routing.module';

import { UploadDoctorSignaturePage } from './upload-doctor-signature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDoctorSignaturePageRoutingModule
  ],
  declarations: [UploadDoctorSignaturePage]
})
export class UploadDoctorSignaturePageModule {}
