import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CliciansPageRoutingModule } from './clicians-routing.module';

import { CliciansPage } from './clicians.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CliciansPageRoutingModule
  ],
  declarations: [CliciansPage]
})
export class CliciansPageModule {}
