import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { LoadingController } from "@ionic/angular";
@Component({
  selector: 'app-volunteer-patient',
  templateUrl: './volunteer-patient.page.html',
  styleUrls: ['./volunteer-patient.page.scss'],
})
export class VolunteerPatientPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  patient_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  constructor(private router: Router,
    public http : HttpClient, 
    public navCtrl: NavController, 
    public menuCtrl: MenuController, 
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      }
  }
  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000,
      spinner: "circles",
      cssClass: "my-loading-class"
    });
    return await loading.present();
    }
    
    async loadingDismiss() {
      return this.loadingController.dismiss();
    }
    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.loadingPresent();
          this.user_id = user_id;
          var formData: any = new FormData();
          formData.append("key", "get_patient_by_volunteer");
          formData.append("user_id", this.user_id);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            if(res != ''){
              this.loadingDismiss();
              this.error_m = "";
              this.patient_list = res;
              //console.log(res);            
            }else{
              this.loadingDismiss();
              this.patient_list =[];
              this.error_m = "Patient data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    searchByKeyword(event){
      var name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "searchByName_volunteer_assign");
      formData.append("user_id", this.user_id);
      formData.append("name", name);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.patient_list = res;
              //console.log(res);
          }else{
            this.patient_list = [];
            //console.log("test");
            this.error_m = "Patient data not available";
          }
        
      })
    }
}
