import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicineListPageRoutingModule } from './medicine-list-routing.module';

import { MedicineListPage } from './medicine-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineListPageRoutingModule
  ],
  declarations: [MedicineListPage]
})
export class MedicineListPageModule {}
