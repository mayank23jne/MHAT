import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { EventService } from '../service/event.service'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  constructor(private router: Router,public event : EventService,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
      }
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

     patientForm(form){
      var formData: any = new FormData();
      formData.append("key", "create");
      formData.append("patient_name", form.value.patient_name);
      formData.append("file_no", form.value.file_no);
      formData.append("age", form.value.age);
      formData.append("gender", form.value.gender);
      formData.append("m_status", form.value.m_status);
      formData.append("phone", form.value.phone);
      formData.append("user_id", this.user_id);
      formData.append("adhaar", form.value.ad_no);
      formData.append("occupation", form.value.occupation);
      formData.append("address", form.value.address);
      formData.append("city", form.value.city);
      if(form.value.desc == undefined){
        formData.append("desc", "");
      }else{
        formData.append("desc", form.value.desc);
      }
      formData.append("clinic_id", this.clinic_id);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
       if(res['status'] == 1){
              this.router.navigate(['/patient-list']);
              this.toastMessage('Patient added successfully.');
            }else{
              this.toastMessage('Something went wrong.');
            }
          
      })
    
     }

}
