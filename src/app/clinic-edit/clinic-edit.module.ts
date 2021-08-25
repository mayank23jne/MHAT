import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicEditPageRoutingModule } from './clinic-edit-routing.module';

import { ClinicEditPage } from './clinic-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicEditPageRoutingModule
  ],
  declarations: [ClinicEditPage]
})
export class ClinicEditPageModule {}
