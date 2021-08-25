import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { any } from 'node_modules_1/codelyzer/util/function';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  address : any = "";
  ad_no : any = "";
  reg : any = "";
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

  doctorForm(form){
    var formData: any = new FormData();
    formData.append("key", "create");
    formData.append("full_name", form.value.full_name);
    formData.append("email", form.value.email);
    formData.append("username", form.value.user_name);
    formData.append("age", form.value.age);
    formData.append("gender", form.value.gender);
    formData.append("phone", form.value.phone);
    formData.append("user_id", this.user_id);
    formData.append("adhaar", this.ad_no);
    formData.append("education", form.value.qualify);
    formData.append("address", this.address);
    formData.append("reg", this.reg);
    formData.append("clinic_id", this.clinic_id);
    formData.append("created_by", this.user_id);
    formData.append("role", "doctor");
    this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
        this.router.navigate(['/doctors']);
        this.toastMessage('Doctor added successfully.');
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
