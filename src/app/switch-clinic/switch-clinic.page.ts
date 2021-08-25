import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-switch-clinic',
  templateUrl: './switch-clinic.page.html',
  styleUrls: ['./switch-clinic.page.scss'],
})
export class SwitchClinicPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  clinics: any = [];
  patient_name: any = [];
  clinic_d: any = [];
  username: string;
  role: string;
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }
  async toastMessage(msg) {
    const toast = await this.toastController.create({
       message: msg,
       duration: 6000,
       position: "bottom",
       cssClass: "my-custom-class-new"
     });
     toast.present();
   }
  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.username = localStorage.getItem("username");
        this.role = localStorage.getItem("role");
        if(this.role == 'clinician'){
          var formData: any = new FormData();
          formData.append("key", "all_clinic");
          this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res : any) => {
          if(res){
                  this.clinics = res;
                }
              
          })
        }else if(this.role == 'doctor'){
          var formData: any = new FormData();
          formData.append("key", "get_clinic_by_doctor");
          formData.append("username",this.username );
          this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res1) => {
            this.clinics = res1;
          });
        }
        
        var formData1: any = new FormData();
        formData1.append("key", "get_clinic_by_id_name");
        formData1.append("id", this.clinic_id);
        this.http.post(this.baseURI+'manage-clinic.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.clinic_d = res1;
              //console.log(this.patient_name);
              console.log(this.clinic_d);
         }else{
              //console.log('hello');
              this.clinic_d = '';
         }
              
          })
        }
    }

    changeClinic(form){
      var c = form.value.clinic_name.id
      localStorage.setItem("clinic_id",c);
      this.clinic_id = localStorage.getItem("clinic_id");
      this.toastMessage("Clinic changed successfully.");
      this.router.navigate(['/patient-list']);
    }
}
