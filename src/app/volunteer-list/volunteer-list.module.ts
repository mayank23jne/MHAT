import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { VolunteerListPageRoutingModule } from './volunteer-list-routing.module';

import { VolunteerListPage } from './volunteer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    VolunteerListPageRoutingModule
  ],
  declarations: [VolunteerListPage]
})
export class VolunteerListPageModule {}
