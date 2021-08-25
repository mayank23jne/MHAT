import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit-clinician',
  templateUrl: './edit-clinician.page.html',
  styleUrls: ['./edit-clinician.page.scss'],
})
export class EditClinicianPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  edit_id: any;
  doctor: any = {};
  constructor(private route : ActivatedRoute,private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
    this.edit_id =this.route.snapshot.params['id'];
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
  ionViewWillEnter(){
    var formData: any = new FormData();
    formData.append("key", "get_doctor_by_id");
    formData.append("id", this.edit_id);
    this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
     
      this.doctor = res;
      console.log(this.doctor);
        
    })
  }
  doctorForm(form){
    var formData: any = new FormData();
    formData.append("key", "update");
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
    formData.append("edit", this.edit_id);
    this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
        this.router.navigate(['/clinicians']);
        this.toastMessage('Clinician updated successfully.');
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
