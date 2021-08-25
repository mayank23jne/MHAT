import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  volunteer_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  role: string;
  

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
      this.role = localStorage.getItem("role");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          var formData: any = new FormData();
          formData.append("key", "get_all_pending_volunteer");
          this.http.post(this.baseURI+'manage-volunteer.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.volunteer_list = res;
              console.log(res);
            }else{
              this.volunteer_list = [];
              this.error_m = "Data not available";
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
    async changeVolunteerStatus(id) {
      if(localStorage.getItem("role") == "clinicadmin"){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: "Are you sure ?",
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
             this.changeStatus(id)
            }
          }
        ]
      });
  
      await alert.present();
    }
    }
    changeStatus(id){
      var formData: any = new FormData();
      formData.append("key", "UpdateStatusById");
      formData.append("id", id);
      formData.append("status", 1);
      this.http.post(this.baseURI+'manage-volunteer.php',formData).subscribe((res : any) => {
       if(res['status'] == 1){
             // this.router.navigate(['/patient-list']);
             this.ionViewDidEnter();
              this.toastMessage('Volunteer request accepted successfully.');
            }else{
              this.toastMessage('Something went wrong.');
            }
          
      })
    }
}
