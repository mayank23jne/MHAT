import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMedicineModalPageRoutingModule } from './update-medicine-modal-routing.module';

import { UpdateMedicineModalPage } from './update-medicine-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMedicineModalPageRoutingModule
  ],
  declarations: [UpdateMedicineModalPage]
})
export class UpdateMedicineModalPageModule {}
