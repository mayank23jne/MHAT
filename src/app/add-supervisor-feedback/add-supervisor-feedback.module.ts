import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSupervisorFeedbackPageRoutingModule } from './add-supervisor-feedback-routing.module';

import { AddSupervisorFeedbackPage } from './add-supervisor-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSupervisorFeedbackPageRoutingModule
  ],
  declarations: [AddSupervisorFeedbackPage]
})
export class AddSupervisorFeedbackPageModule {}
