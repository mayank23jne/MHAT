import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClinicianPageRoutingModule } from './edit-clinician-routing.module';

import { EditClinicianPage } from './edit-clinician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditClinicianPageRoutingModule
  ],
  declarations: [EditClinicianPage]
})
export class EditClinicianPageModule {}
