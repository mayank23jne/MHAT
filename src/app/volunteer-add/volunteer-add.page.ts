import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-volunteer-add',
  templateUrl: './volunteer-add.page.html',
  styleUrls: ['./volunteer-add.page.scss'],
})
export class VolunteerAddPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  role: string;
  constructor(private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.role = localStorage.getItem("role");
        console.log(this.role);
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

  volunteerForm(form){
    var msg;
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
    formData.append("role", "volunteer");
    if(this.role == 'clinicadmin'){
      formData.append("status", "1");
      msg = "Volunteer added successfully.";
    }else{
      formData.append("status", "0");
      msg = "The details have been added and has been sent for approval";
    }
    formData.append("added_by", this.role);
    this.http.post(this.baseURI+'manage-volunteer.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
        this.router.navigate(['/volunteer']);
        this.toastMessage(msg);
      }else if(res['status'] == 2){
        this.toastMessage('Enter unique usename.');
      }else if(res['status'] == 3){
        this.toastMessage('Enter unique email.');
      }else{
        this.toastMessage('Something went wrong.');
      }
        
    })
  

}
}
