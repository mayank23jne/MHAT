import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from "@ionic-native/file/ngx";
import { environment } from '../../../environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router} from '@angular/router';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
@Component({
  selector: 'app-view-upcoming-appointment',
  templateUrl: './view-upcoming-appointment.page.html',
  styleUrls: ['./view-upcoming-appointment.page.scss'],
})
export class ViewUpcomingAppointmentPage implements OnInit {
  modelId: number;
  appointment:any = [];
  baseURI :string = environment.app_url;
  constructor(
    public http : HttpClient,
     private modalController: ModalController,
     private navParams: NavParams,
     public alertController: AlertController, 
     public toastController: ToastController,
     public router : Router,
  ) { }

  ngOnInit() {
    this.modelId = this.navParams.data.patient_id;
    var formData: any = new FormData();
    formData.append("key", "upcoming_appointment");
    formData.append("id", this.modelId);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
      if(res!=""){
         this.appointment = res;
         console.log(this.appointment);
        } 
      })
  }
  async deleteAppointment(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deletePatientAppointment(id)
          }
        }
      ]
    });

    await alert.present();
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
   updateAppointment(id){
     this.closeModal();
    this.router.navigate(['/reschedule-appointment',id]);
   }
  deletePatientAppointment(id){
    var formData: any = new FormData();
    formData.append("key", "delete_appointment_by_patient");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
      if(res['status']== 1){ 
        this.toastMessage("Patient appointment deleted successfully");
        this.closeModal();
      }else{
        this.toastMessage("Something went wrong.");
      }       
      
   });

  }
  async closeModal() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }
}
