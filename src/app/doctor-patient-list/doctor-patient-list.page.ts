import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { LoadingController } from "@ionic/angular";
@Component({
  selector: 'app-doctor-patient-list',
  templateUrl: './doctor-patient-list.page.html',
  styleUrls: ['./doctor-patient-list.page.scss'],
})
export class DoctorPatientListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  from_date : any ="";
  to_date : any = "";
  loading: any;
  patient_list: any = [];
  error_m: any ;
  search_name: any;
  page_number = 1;
  start : any = 20;
  start1: any;
  constructor(public alertController: AlertController,private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController,public loadingController: LoadingController) { }
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
    async toastMessage(msg) {
      const toast = await this.toastController.create({
         message: msg,
         duration: 6000,
         position: "bottom",
         cssClass: "my-custom-class-new"
       });
       toast.present();
     }
    async sendPatientAprroval(patient_id) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: "Are you sure you want to?",
        buttons: [
          {
            text: 'Reject',
            //role: 'cancel',
            //cssClass: 'secondary',
            handler: (blah) => {
              this.doctorPatientStatus(patient_id,'2')
            }
          }, {
            text: 'Accept',
            handler: () => {
             this.doctorPatientStatus(patient_id,'1')
            }
          }
        ]
      });
  
      await alert.present();
    }
  doctorPatientStatus(patient_id,status) {
    
    var formData: any = new FormData();
    formData.append("key", "change_doctor_status");
    formData.append("doctor_id", this.user_id);
    formData.append("patient_id", patient_id);
    formData.append("status", status);
    this.http.post(this.baseURI+'manage-send-to-doctor.php',formData).subscribe((res) => {
      if(res['status'] == 1){
        this.ionViewDidEnter();
        this.toastMessage("Patient status succesfully updated.");       
      }else{
        this.toastMessage("Something went wrong.");
      }
      
      
   });
  }
  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;        
      }
    }
  ionViewDidEnter() {
    this.page_number = 1;
    this.start  = 20;
    this.clinic_id = localStorage.getItem("clinic_id");

      if (this.user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.loadingPresent();
        //this.user_id = user_id;
        var date = new Date();
        var day = ("0" + date.getDate()).slice(-2);  //Date of the month: 2 in our example
        var month = ("0" + (date.getMonth() + 1)).slice(-2); //Month of the Year: 0-based index, so 1 in our example
        var year = date.getFullYear();
        //console.log(new_time);
        this.from_date = year+'-'+month+'-'+day;
        this.to_date = this.from_date;
        var formData: any = new FormData();
        formData.append("key", "get_patient_by_doctor_id_new");
        formData.append("user_id", this.user_id);
        formData.append("clinic_id", this.clinic_id);
        formData.append("from_date", this.from_date);
        formData.append("to_date", this.from_date);
        formData.append("start", 0);

        this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
          if(res != ''){
            this.loadingDismiss();
            this.error_m = "";
            this.patient_list = res;   
          }else{
            this.loadingDismiss();
            this.patient_list =[];
            this.error_m = "Patient data not available";
            //console.log(res);
          }
          
          
       });
      }
  }
  getData(isFirstLoad,event){
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_patient_by_doctor_id");
    formData.append("user_id", this.user_id);
    formData.append("clinic_id", this.clinic_id);
    formData.append("from_date", this.from_date);
    formData.append("to_date", this.from_date);
    formData.append('start', this.start1);
    if(this.search_name!=''){
      formData.append('name', this.search_name);
    }
    this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
      if(res != ''){
        //this.service_list = res['data'];
        for (let i = 0; i < res.length; i++) {
          this.patient_list.push(res[i]);
        }
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
  searchByKeyword(event){
    this.page_number = 1;
    this.start  = 20;
    this.search_name = event.target.value;
    var formData: any = new FormData();
    formData.append("key", "get_patient_by_doctor_id");
    formData.append("user_id", this.user_id);
    formData.append("clinic_id", this.clinic_id);
    formData.append("from_date", this.from_date);
    formData.append("to_date", this.from_date);
    formData.append("start", 0);
    formData.append("name", this.search_name);
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
  // selectedAppointment(){
  //   var from_ = this.from_date.substring(0,10);
  //   var to_ = this.to_date.substring(0,10);
  //   var formData: any = new FormData();
  //   formData.append("key", "get_patient_by_doctor_id");
  //   formData.append("clinic_id", this.clinic_id);
  //   formData.append("user_id", this.user_id);
  //   formData.append("from_date", from_);
  //   formData.append("to_date", to_);
  //   if(this.from_date!="" && this.to_date!=""){
  //   this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
  //     if(res != ''){
  //       this.patient_list = res;
  //       this.error_m ="";
  //       //console.log(res);            
  //     }else{
  //       this.patient_list = [];
  //       this.error_m = "Data not available";
  //      // console.log(res);
  //     }
      
      
  //   });
  // }
  // }
}
