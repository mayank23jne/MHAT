import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileLogDetailPageRoutingModule } from './profile-log-detail-routing.module';

import { ProfileLogDetailPage } from './profile-log-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileLogDetailPageRoutingModule
  ],
  declarations: [ProfileLogDetailPage]
})
export class ProfileLogDetailPageModule {}
