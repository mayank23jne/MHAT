import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  doctor_list: any = [];
  clinic_name: any = {};
  error_m: any ;
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
          formData.append("key", "get_doctor_all");
          formData.append("clinic_id", this.clinic_id);
          this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.doctor_list = res;
              console.log(res);            
            }else{
              this.doctor_list = [];
              this.error_m = "Doctor data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    searchByKeyword(event){
      var name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "searchByName");
      formData.append("name", name);
      this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.doctor_list = res;
          }else{
            this.doctor_list = [];
            this.error_m = "Doctor data not available";
          }
        
      })
    }
    onCancel(event){
      alert();
    }
    async deleteDoctorById(id) {
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
             this.deleteDoctor(id)
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
  deleteDoctor(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewDidEnter();
            this.toastMessage('Doctor deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
}
