import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AssignDoctorListPageRoutingModule } from './assign-doctor-list-routing.module';

import { AssignDoctorListPage } from './assign-doctor-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AssignDoctorListPageRoutingModule
  ],
  declarations: [AssignDoctorListPage]
})
export class AssignDoctorListPageModule {}
