import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentListPageRoutingModule } from './sent-list-routing.module';

import { SentListPage } from './sent-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentListPageRoutingModule
  ],
  declarations: [SentListPage]
})
export class SentListPageModule {}
