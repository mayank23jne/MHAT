import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform , ModalController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { LoadingController } from "@ionic/angular";
import { Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
@Component({
  selector: 'app-sent-list',
  templateUrl: './sent-list.page.html',
  styleUrls: ['./sent-list.page.scss'],
})
export class SentListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  from_date : any ="";
  to_date : any = "";
  loading: any;
  patient_list: any = [];
  error_m: any ;
  datePickerObj: any = {};
  today = new Date();
  constructor(public modalCtrl: ModalController,private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public loadingController: LoadingController) { }
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
    ngOnInit() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;        
        }
        this.datePickerObj = {
          dateFormat: 'YYYY-MM-DD',
          inputDate:this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default new Date()
          //fromDate: this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default null
          toDate: new Date('2050-12-31'), // default null
          btnProperties:
          {
          expand : 'block',  // “block” | “full”
          fill : 'solid',             // “clear” | “default” | “outline” | “solid”
          size :'default',      // “default” | “large” | “small”
          disabled :false,   // true | false
          strong :false,      // true | false
          color: '#a6ce39'  // “primary” | “secondary” | “tertiary” |
          // “success” | “warning” | “danger” | “light” | “medium” | “dark”
          },
        };
      }
    ionViewDidEnter() {
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
          formData.append("key", "get_sent_patient_by_doctor_id");
          formData.append("user_id", this.user_id);
          formData.append("clinic_id", this.clinic_id);
          formData.append("from_date", this.from_date);
          formData.append("to_date", this.from_date);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            if(res != ''){
              this.loadingDismiss();
              this.error_m = "";
              this.patient_list = res;   
            }else{
              this.loadingDismiss();
              this.patient_list =[];
              this.error_m = "Patient data not available";
            }
            
            
         });
        }
    }
    // searchByKeyword(event){
    //   var name = event.target.value;
    //   var formData: any = new FormData();
    //   formData.append("key", "searchDoctorPatientByName");
    //   formData.append("user_id", this.user_id);
    //   formData.append("name", name);
    //   this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
    //     if(res != ''){
    //        // this.router.navigate(['/patient-list']);
    //           this.error_m = "";
    //           this.patient_list = res;
    //           //console.log(res);
    //       }else{
    //         this.patient_list = [];
    //         //console.log("test");
    //         this.error_m = "Patient data not available";
    //       }
        
    //   })
    // }
    selectedAppointment(){
      var from_ = this.from_date.substring(0,10);
      var to_ = this.to_date.substring(0,10);
      var formData: any = new FormData();
      formData.append("key", "get_sent_patient_by_doctor_id");
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      formData.append("from_date", from_);
      formData.append("to_date", to_);
      if(this.from_date!="" && this.to_date!=""){
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
        if(res != ''){
          this.patient_list = res;
          this.error_m ="";            
        }else{
          this.patient_list = [];
          this.error_m = "Data not available";
        }
        
        
      });
    }
    }
    async openDatePicker() {
      const datePickerModal = await this.modalCtrl.create({
        component: Ionic4DatepickerModalComponent,
        cssClass: 'li-ionic4-datePicker',
        componentProps: { 
           'objConfig': this.datePickerObj, 
           'selectedDate': this.from_date 
        }
      });
      await datePickerModal.present();
  
      datePickerModal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if(data.data!=undefined){
          if(data.data.date != "Invalid date"){
            this.from_date = data.data.date;
          }
        }else{
            this.from_date = this.from_date;
          }
          
        });
    }  
    async openDatePicker2() {
      const datePickerModal = await this.modalCtrl.create({
        component: Ionic4DatepickerModalComponent,
        cssClass: 'li-ionic4-datePicker',
        componentProps: { 
           'objConfig': this.datePickerObj, 
           'selectedDate': this.to_date 
        }
      });
      await datePickerModal.present();
  
      datePickerModal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if(data.data!=undefined){
          if(data.data.date != "Invalid date"){
            this.to_date = data.data.date;
          }
          }else{
            this.to_date = this.to_date;
          }
          
        });
    }   
from_date_picker(){
this.openDatePicker();
}
to_date_picker(){
this.openDatePicker2();
}
}
