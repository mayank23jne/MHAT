import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadSignaturePageRoutingModule } from './upload-signature-routing.module';

import { UploadSignaturePage } from './upload-signature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadSignaturePageRoutingModule
  ],
  declarations: [UploadSignaturePage]
})
export class UploadSignaturePageModule {}
