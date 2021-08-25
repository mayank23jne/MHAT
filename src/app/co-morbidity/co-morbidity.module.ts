import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoMorbidityPageRoutingModule } from './co-morbidity-routing.module';

import { CoMorbidityPage } from './co-morbidity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoMorbidityPageRoutingModule
  ],
  declarations: [CoMorbidityPage]
})
export class CoMorbidityPageModule {}
