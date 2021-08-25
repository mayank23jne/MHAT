import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSupervisorFeedbackPageRoutingModule } from './update-supervisor-feedback-routing.module';

import { UpdateSupervisorFeedbackPage } from './update-supervisor-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSupervisorFeedbackPageRoutingModule
  ],
  declarations: [UpdateSupervisorFeedbackPage]
})
export class UpdateSupervisorFeedbackPageModule {}
