import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ScheduleListPageRoutingModule } from './schedule-list-routing.module';

import { ScheduleListPage } from './schedule-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ScheduleListPageRoutingModule
  ],
  declarations: [ScheduleListPage]
})
export class ScheduleListPageModule {}
