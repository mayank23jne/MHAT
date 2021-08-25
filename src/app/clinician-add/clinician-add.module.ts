import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ClinicianAddPageRoutingModule } from './clinician-add-routing.module';

import { ClinicianAddPage } from './clinician-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ClinicianAddPageRoutingModule
  ],
  declarations: [ClinicianAddPage]
})
export class ClinicianAddPageModule {}
