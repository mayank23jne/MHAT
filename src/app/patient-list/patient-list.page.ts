import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController , AlertController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { EventService } from '../service/event.service';
import { LoadingController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { ChangeStatusPage } from '../modals/change-status/change-status.page';
import * as XLSX from 'xlsx';
declare var $:any;
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  patient_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  selectedArray :any = [];

  page_number = 1;
  start : any = 50;
  start1: any;
  search_name: any = "";
  role: string;
  constructor(public alertController: AlertController,public modalController: ModalController,private router: Router,public event : EventService,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController,public loadingController: LoadingController) { }
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
        this.clinic_id = localStorage.getItem("clinic_id");
        this.role = localStorage.getItem("role");
        if(this.clinic_id!=0){
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
        this.clinic_name = res['name'];
        });
      }
      }
    }
    async exportToExcel(data, filename="patient_list") {
      
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
    }
  ionViewWillEnter() {
    this.page_number = 1;
    this.start  = 50;
    this.search_name = "";
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.loadingPresent();
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        var formData: any = new FormData();
        formData.append("key", "get_patient_by_clinic");
        formData.append("clinic_id", this.clinic_id);
        formData.append("user_id", this.user_id);
        formData.append("start", 0);
        this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
          if(res != ''){
            this.loadingDismiss();
            this.error_m = "";
            this.patient_list = res;
            console.log(res);            
          }else{
            this.loadingDismiss();
            this.patient_list =[];
            this.error_m = "Patient data not available";
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
  searchByKeyword(){
    this.selectedArray = [];
    this.page_number = 1;
    this.start  = 50;
    console.log(this.search_name);
    var formData: any = new FormData();
    formData.append("key", "get_patient_by_clinic");
    formData.append("clinic_id", this.clinic_id);
    formData.append("name", this.search_name);
    formData.append("start", 0);
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
  
  async changePatientStatus(patient_id , status){
    const modal = await this.modalController.create({
      component: ChangeStatusPage,
      cssClass: 'change-patient-status-modal',
      backdropDismiss:false,
      componentProps: {
        "paramID": patient_id,
        "paramStatus": status,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log("hello")
        this.ionViewWillEnter();
      }
    });

    return await modal.present();
  }
  async deleteAppointment(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete appointment ?",
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
           this.deletePatientAppointment(id)
          }
        }
      ]
    });

    await alert.present();
  }
  deletePatientAppointment(id){
    var formData: any = new FormData();
    formData.append("key", "delete_appointment_by_patient");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
      if(res['status']== 1){ 
        this.toastMessage("Patient appointment deleted successfully");
        this.ionViewWillEnter();
      }else{
        this.toastMessage("Something went wrong.");
      }       
      
   });

  }
  getData(isFirstLoad,event){
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_patient_by_clinic");
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
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
        console.log(this.patient_list);            
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
  selectpatient(ev,id){
    if (ev.detail.checked == true) {
       this.selectedArray.push(id);
     console.log("if",this.selectedArray);
     } else {
      let newArray = this.selectedArray.filter(function(el) {
        return el !== id;
     });
      this.selectedArray = newArray;
      console.log("else",this.selectedArray);
    }
  }
  async deletePatient() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
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
           this.deleteMultiplePatient()
          }
        }
      ]
    });

    await alert.present();
  }
  deleteMultiplePatient(){
    var formData: any = new FormData();
    formData.append("key", "delete_multiple_patient");
    formData.append("id", this.selectedArray);
    this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
      if(res['status']== 1){ 
        this.selectedArray = [];
        this.toastMessage("Patient deleted successfully");
        this.ionViewWillEnter();
      }else{
        this.toastMessage("Something went wrong.");
      }       
      
   });

  }
}
