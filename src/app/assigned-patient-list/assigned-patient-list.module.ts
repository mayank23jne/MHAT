import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedPatientListPageRoutingModule } from './assigned-patient-list-routing.module';

import { AssignedPatientListPage } from './assigned-patient-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedPatientListPageRoutingModule
  ],
  declarations: [AssignedPatientListPage]
})
export class AssignedPatientListPageModule {}
