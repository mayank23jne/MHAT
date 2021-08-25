import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.page.html',
  styleUrls: ['./notes-details.page.scss'],
})
export class NotesDetailsPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }


  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        if(this.clinic_id!=0){
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
          this.clinic_name = res['name'];
        });
      }
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
        if(localStorage.getItem("role")=="volunteer"){
          formData.append("key", "get_patient_by_volunteer");
        }if(localStorage.getItem("role")=="doctor"){
          formData.append("key", "get_patient_by_doctor_id_for_note");
        }else{
          formData.append("key", "get_patient_by_clinic");
        }        
        formData.append("clinic_id", this.clinic_id);
        formData.append("user_id", this.user_id);
        this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
          if(res != ''){
            this.patient_list = res;  
          }else{
            this.error_m = "Paitent data not available";
            //console.log(res);
          }
          
          
       });
      }
  }
  searchByKeyword(event){
    var name = event.target.value;
    var formData: any = new FormData();
    if(localStorage.getItem("role")=="volunteer"){
      formData.append("key", "searchByName_volunteer_assign");
    }if(localStorage.getItem("role")=="doctor"){
      formData.append("key", "get_searchByName_patient_by_doctor_id_for_note");
    }else{
      formData.append("key", "searchByName");
    } 
    formData.append("clinic_id", this.clinic_id);
    formData.append("name", name);
    formData.append("user_id", this.user_id);
    this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
      if(res != ''){
         // this.router.navigate(['/patient-list']);
            this.error_m = "";
            this.patient_list = res;
            //console.log(res);
        }else{
          this.patient_list = [];
          this.error_m = "Patient data not available";
        }
      
    })
  }
}
