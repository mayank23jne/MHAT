import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-send-to-doctor',
  templateUrl: './send-to-doctor.page.html',
  styleUrls: ['./send-to-doctor.page.scss'],
})
export class SendToDoctorPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  doctor_list: any = [];
  clinic_name: any = {};
  patient_id: any = {};
  error_m: any ;
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
          this.clinic_name = res['name'];
        });
      }
  }
  ionViewDidEnter() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        var formData: any = new FormData();
        formData.append("key", "get_doctor_by_clinic_id");
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res) => {
          if(res != ''){
            this.doctor_list = res;
            //console.log(res);            
          }else{
            this.error_m = "Doctor data not available";
            //console.log(res);
          }
          
          
       });
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
   async sendPatient(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to send patient to this doctor ?",
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
           this.assignPatient(id)
          }
        }
      ]
    });

    await alert.present();
  }
  assignPatient(id){
    var formData: any = new FormData();
    formData.append("key", "assign_patient_to_doctor");
    formData.append("user_id", this.user_id);
    formData.append("clinic_id", this.clinic_id);
    formData.append("patient_id", this.patient_id);
    formData.append("doctor_id", id);
    this.http.post(this.baseURI+'manage-send-to-doctor.php',formData).subscribe((res) => {
      if(res['status']== 1){     
        window.history.back();
        this.toastMessage("Patient successfully send to doctor.");
      }else if(res['status']== 2){
        window.history.back();
        this.toastMessage("Patient already send to doctor.");
      }else{
        this.toastMessage("Something went wrong.");
      }
      
      
   });
    
  }
}
