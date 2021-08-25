import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileUpdateLogPageRoutingModule } from './profile-update-log-routing.module';

import { ProfileUpdateLogPage } from './profile-update-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileUpdateLogPageRoutingModule
  ],
  declarations: [ProfileUpdateLogPage]
})
export class ProfileUpdateLogPageModule {}
