import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-assign-volunteer-to-clinic',
  templateUrl: './assign-volunteer-to-clinic.page.html',
  styleUrls: ['./assign-volunteer-to-clinic.page.scss'],
})
export class AssignVolunteerToClinicPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  volunteer_list: any = [];
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

    searchByKeyword(event){
      var name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "searchByAssignClinicName");
      formData.append("name", name);
      this.http.post(this.baseURI+'manage-clinic-volunteer-map.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.volunteer_list = res;
          }else{
            this.volunteer_list = [];
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
          formData.append("key", "get_assign_clinic_volunteer");
          this.http.post(this.baseURI+'manage-clinic-volunteer-map.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.volunteer_list = res;
              console.log(res);            
            }else{
              this.volunteer_list = [];
              this.error_m = "Assign data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    async deleteVolunteerById(id) {
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
    this.http.post(this.baseURI+'manage-clinic-volunteer-map.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewDidEnter();
            this.toastMessage('Assigned user deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }

}
