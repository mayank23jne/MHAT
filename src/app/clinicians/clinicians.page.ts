import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-clinicians',
  templateUrl: './clinicians.page.html',
  styleUrls: ['./clinicians.page.scss'],
})
export class CliniciansPage implements OnInit {
  baseURI :string = environment.app_url;
  profileURI :string = environment.profile_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  clinician_list: any = [];
  clinic_name: any = {};
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
    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          var formData: any = new FormData();
          formData.append("key", "get_clinician_all_by_limit");
          formData.append("clinic_id", this.clinic_id);
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.clinician_list = res;
              console.log(res);            
            }else{
              this.clinician_list = [];
              this.error_m = "Clinician data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    searchByKeyword(event){
      this.page_number = 1;
      this.start  = 10;
      this.search_name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "get_clinician_all_by_limit");
      formData.append("name", this.search_name);
      formData.append("start", 0);
      this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.clinician_list = res;
          }else{
            this.clinician_list = [];
            this.error_m = "Clinician data not available";
          }
        
      })
    }
    onCancel(event){
      alert();
    }
    async deleteClinicianById(id) {
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
             this.deleteClinician(id)
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
  deleteClinician(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewDidEnter();
            this.toastMessage('Clinician deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  getData(isFirstLoad,event){
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_clinician_all_by_limit");
    formData.append('start', this.start1);
    formData.append('clinic_id', this.clinic_id);
    if(this.search_name!=''){
      formData.append('name', this.search_name);
    }
    this.http.post(this.baseURI+'manage-clinician.php',formData).subscribe((res : any) => {
      if(res != ''){
        //this.service_list = res['data'];
        for (let i = 0; i < res.length; i++) {
          this.clinician_list.push(res[i]);
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
