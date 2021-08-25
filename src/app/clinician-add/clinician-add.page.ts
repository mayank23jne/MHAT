import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-clinician-add',
  templateUrl: './clinician-add.page.html',
  styleUrls: ['./clinician-add.page.scss'],
})
export class ClinicianAddPage implements OnInit {

  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  constructor(private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

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

  clinicianForm(form){
    var formData: any = new FormData();
    formData.append("key", "create");
    formData.append("full_name", form.value.full_name);
    formData.append("email", form.value.email);
    formData.append("username", form.value.user_name);
    formData.append("age", form.value.age);
    formData.append("gender", form.value.gender);
    formData.append("phone", form.value.phone);
    formData.append("user_id", this.user_id);
    formData.append("adhaar", form.value.ad_no);
    formData.append("education", form.value.qualify);
    formData.append("address", form.value.address);
    formData.append("clinic_id", this.clinic_id);
    formData.append("created_by", this.user_id);
    formData.append("role", "clinician");
    this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
        this.router.navigate(['/clinicians']);
        this.toastMessage('Clinician added successfully.');
      }else if(res['status'] == 2){
        this.toastMessage('Enter unique username.');
      }else if(res['status'] == 3){
        this.toastMessage('Enter unique email.');
      }else{
        this.toastMessage('Something went wrong.');
      }
        
    })
  

}

}
