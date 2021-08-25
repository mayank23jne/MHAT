import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-change-clinic',
  templateUrl: './change-clinic.page.html',
  styleUrls: ['./change-clinic.page.scss'],
})
export class ChangeClinicPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  clinics: any = [];
  patient_name: any = [];
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
        this.patient_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("key", "all_clinic");
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res : any) => {
        if(res){
                this.clinics = res;
                console.log(this.clinics);
              }
            
        })
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_clinic_by_id");
        formData1.append("id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.patient_name = res1;
              //console.log(this.patient_name);
              console.log(this.patient_name);
         }else{
              //console.log('hello');
              this.patient_name = '';
         }
              
          })
        }
    }

    changeClinic(form){
      var formData: any = new FormData();
      formData.append("key", "clinic_change");
      formData.append("clinic_id", form.value.clinic_name.id);
      formData.append("patient_id", this.patient_id);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
            this.toastMessage("Clinic changed successfully.");
            window.history.back();
          }else{
            this.toastMessage("Something went wrong.");
          }
            
        })
    }

}
