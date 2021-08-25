import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-assign-doctor-list',
  templateUrl: './assign-doctor-list.page.html',
  styleUrls: ['./assign-doctor-list.page.scss'],
})
export class AssignDoctorListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  clinic_list: any = [];
  error_m: any ;
  page_number = 1;
  start : any = 10;
  start1: any;
  search_name: any = "";
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
      formData.append("key", "get_assign_clinic_doctor");
      formData.append("name", this.search_name);
      formData.append("start", 0);
      this.http.post(this.baseURI+'manage-clinic-doctor-map.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.clinic_list = res;
          }else{
            this.clinic_list = [];
            this.error_m = "Assign data not available";
          }
        
      })
    }

    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          var formData: any = new FormData();
          formData.append("key", "get_assign_clinic_doctor");
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-clinic-doctor-map.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.clinic_list = res;
              //console.log(res);            
            }else{
              this.clinic_list = [];
              this.error_m = "Assign data not available";
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
    this.http.post(this.baseURI+'manage-clinic-doctor-map.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewDidEnter();
            this.toastMessage('Assigned user deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  getData(isFirstLoad,event){
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_assign_clinic_doctor");
    formData.append('start', this.start1);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
     if(this.search_name!=''){
       formData.append('name', this.search_name);
     }
    this.http.post(this.baseURI+'manage-clinic-doctor-map.php',formData).subscribe((res : any) => {
      if(res != ''){
        //this.service_list = res['data'];
        for (let i = 0; i < res.length; i++) {
          this.clinic_list.push(res[i]);
        }
        //console.log(this.clinic_list);            
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
