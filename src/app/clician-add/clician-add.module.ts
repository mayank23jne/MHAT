import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClicianAddPageRoutingModule } from './clician-add-routing.module';

import { ClicianAddPage } from './clician-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClicianAddPageRoutingModule
  ],
  declarations: [ClicianAddPage]
})
export class ClicianAddPageModule {}
