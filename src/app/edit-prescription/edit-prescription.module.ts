import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { EditPrescriptionPageRoutingModule } from './edit-prescription-routing.module';

import { EditPrescriptionPage } from './edit-prescription.page';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    IonicSelectableModule,
    EditPrescriptionPageRoutingModule,
    
  ],
  declarations: [EditPrescriptionPage]
})
export class EditPrescriptionPageModule {}
