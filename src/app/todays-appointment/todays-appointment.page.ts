import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.page.html',
  styleUrls: ['./todays-appointment.page.scss'],
})
export class TodaysAppointmentPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  today_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  currentDate: any;
  page_number = 1;
  start : any = 10;
  start1: any;
  search_name: any = "";
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
          this.currentDate=new Date().toISOString().substr(0,10);
          var formData: any = new FormData();
          formData.append("key", "get_today_appointment_by_user_clinic");
          formData.append("clinic_id", this.clinic_id);
          formData.append("user_id", this.user_id);
          formData.append("date", this.currentDate);
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
            if(res != ''){
              this.today_list = res;
              this.error_m = "";
              console.log(res);            
            }else{
              this.today_list = [];
              this.error_m = "Data not available";
              console.log(res);
            }
            
            
         });
        }
    }
    searchByKeyword(event){
      this.page_number = 1;
      this.start  = 10;
      this.search_name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "get_today_appointment_by_user_clinic");
      formData.append("name", this.search_name);
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      formData.append("date", this.currentDate);
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.today_list = res;
          }else{
            this.today_list = [];
            this.error_m = "Data not available";
          }
        
      })
    }
    getData(isFirstLoad,event){
      this.page_number++;
       this.start1 = (this.page_number-1) * this.start; 
      let formData = new FormData();
      formData.append("key", "get_today_appointment_by_user_clinic");
      formData.append('start', this.start1);
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      formData.append("date", this.currentDate);
      if(this.search_name!=''){
        formData.append('name', this.search_name);
      }
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
        if(res != ''){
          //this.service_list = res['data'];
          for (let i = 0; i < res.length; i++) {
            this.today_list.push(res[i]);
          }
          //console.log(this.clinician_list);            
          //console.log(this.service_list)
          if (isFirstLoad)
            event.target.complete();
         
          //console.log(res['data'].length);
        }else{
          event.target.complete();
        }
        })
  
      
    }
    doInfinite(event) {
      this.getData(true,event);
    }
}
