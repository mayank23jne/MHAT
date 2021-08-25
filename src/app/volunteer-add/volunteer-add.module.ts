import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { VolunteerAddPageRoutingModule } from './volunteer-add-routing.module';

import { VolunteerAddPage } from './volunteer-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    VolunteerAddPageRoutingModule
  ],
  declarations: [VolunteerAddPage]
})
export class VolunteerAddPageModule {}
