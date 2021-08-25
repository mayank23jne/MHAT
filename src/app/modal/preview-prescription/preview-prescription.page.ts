import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
@Component({
  selector: 'app-preview-prescription',
  templateUrl: './preview-prescription.page.html',
  styleUrls: ['./preview-prescription.page.scss'],
})
export class PreviewPrescriptionPage implements OnInit {
  modelId: number;
  prescription:any = [];
  baseURI :string = environment.app_url;
  fileURI :string = environment.file_url;
  clinic_id: any;
  patient_id: any;
  user_id: any;
  app_id: any;
  error: string;
  constructor(
    public http : HttpClient,
     private modalController: ModalController,
     private navParams: NavParams,
     public toastController: ToastController
  ) { }

  ngOnInit() {
    this.clinic_id = this.navParams.data.clinic_id;
    this.patient_id = this.navParams.data.patient_id;
    this.user_id = this.navParams.data.user_id;
    this.app_id = this.navParams.data.app_id;
    var formData: any = new FormData();
    formData.append("key", "get_prescription_by_current_date");
    formData.append("patient_id", this.patient_id);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
      if(res!=""){
         this.prescription = res;
         this.error = "";
        }else{
          this.error = "There is no prescription for preview";
        } 
      })
  }
  async toastMessage(msg) {
    const toast = await this.toastController.create({
       message: msg,
       duration: 6000,
       position: "bottom",
       cssClass: "my-custom-class-new"
     });
     toast.present();
   }
  sendToClinic(){
    var formData: any = new FormData();
    formData.append("clinic_id", this.clinic_id);
    formData.append("patient_id", this.patient_id);
    formData.append("user_id", this.user_id);
    formData.append("app_id", this.app_id);
    this.http.post(this.baseURI+'prescription_pdf_generator.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
             this.closeModal();
             this.toastMessage('Send to Clinic Successfull.');
           }else{
             this.toastMessage('Something went wrong.');
           }         
     })
  }
  async closeModal() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }

}
