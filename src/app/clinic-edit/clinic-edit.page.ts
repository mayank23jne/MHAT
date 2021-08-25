import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.page.html',
  styleUrls: ['./clinic-edit.page.scss'],
})
export class ClinicEditPage implements OnInit {
  clinic_id: any;
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_list : any = [];
  constructor(private router: Router,public alertController: AlertController,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.clinic_id =this.route.snapshot.params['id'];
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        //this.clinic_id = localStorage.getItem("clinic_id");
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
  formData.append("key", "get_clinic_by_id");
  formData.append("clinic_id", this.clinic_id);
  this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
    if(res['status'] == 1){
      this.clinic_list = res['data'];
      console.log(this.clinic_list);
    }else{
      this.toastMessage('Something went wrong.');
    }
  })
}
clinicForm(form){
  var formData: any = new FormData();
  formData.append("key", "update");
  formData.append("name", form.value.full_name);
  formData.append("email", form.value.email);
  formData.append("phone", form.value.phone);
  formData.append("landline", form.value.landline);
  formData.append("city", form.value.city);
  formData.append("street", form.value.street);
  formData.append("clinic_id", this.clinic_id);
  formData.append("pincode", form.value.pincode);
  formData.append("address", form.value.address);
  formData.append("pan_card", form.value.pan_card);
  // formData.append("contact_person", form.value.contact_person);
  this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
   if(res['status'] == 1){
      this.router.navigate(['/clinics']);
      this.toastMessage('Clinic updated successfully.');
    }else{
      this.toastMessage('Something went wrong.');
    }
      
  })

}
}
