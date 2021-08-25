import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AssignVolunteerPageRoutingModule } from './assign-volunteer-routing.module';

import { AssignVolunteerPage } from './assign-volunteer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AssignVolunteerPageRoutingModule
  ],
  declarations: [AssignVolunteerPage]
})
export class AssignVolunteerPageModule {}
