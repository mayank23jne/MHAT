import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicineModalPageRoutingModule } from './medicine-modal-routing.module';

import { MedicineModalPage } from './medicine-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineModalPageRoutingModule
  ],
  declarations: [MedicineModalPage]
})
export class MedicineModalPageModule {}
