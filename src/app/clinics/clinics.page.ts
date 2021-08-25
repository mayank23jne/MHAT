import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.page.html',
  styleUrls: ['./clinics.page.scss'],
})
export class ClinicsPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  clinic_list: any ;
  clinic_name: any = {};
  error_m: any ;
  page_number = 1;
  start : any = 10;
  start1: any;
  search_name: any = "";
  toal_clinic: any;
  total_clinic: any;
  clinic__excel_list: any;
  constructor(private router: Router,public alertController: AlertController,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
      }
    }

    searchByKeyword(event){
      this.page_number = 1;
      this.start  = 10;
      this.search_name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "get_clinic_all");
      formData.append("name", this.search_name);
      formData.append("start", 0);
      this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.clinic_list = res['data'];
              this.total_clinic = res['count'];
          }else{
            this.clinic_list = [];
            this.total_clinic = res['count'];
            this.error_m = "Clinic data not available";
          }
        
      })
    }
    async exportToExcel(data, filename="test") {
      
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
    }
    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          var formData: any = new FormData();
          formData.append("key", "get_clinic_all");
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
            if(res['status'] == 1){
              this.error_m = "";
              this.total_clinic = res['count'];
              this.clinic_list = res['data'];
              this.clinic__excel_list = res['excel_data'];
              console.log(this.clinic_list.length);            
            }else{
              this.clinic_list = [];
              this.clinic__excel_list = [];
              this.total_clinic = res['count'];
              this.error_m = "Clinic data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    async deleteClinicById(id) {
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
             this.deleteClinic(id)
            }
          }
        ]
      });
  
      await alert.present();
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
  deleteClinic(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewDidEnter();
            this.toastMessage('Clinic deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  getData(isFirstLoad,event){
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_clinic_all");
    formData.append('start', this.start1);
    if(this.search_name!=''){
      formData.append('name', this.search_name);
    }
    this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
        //this.service_list = res['data'];
        for (let i = 0; i < res['data'].length; i++) {
          this.clinic_list.push(res['data'][i]);
        }
        console.log(this.clinic_list);            
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
