import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { CliniciansPageRoutingModule } from './clinicians-routing.module';

import { CliniciansPage } from './clinicians.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    CliniciansPageRoutingModule
  ],
  declarations: [CliniciansPage]
})
export class CliniciansPageModule {}
