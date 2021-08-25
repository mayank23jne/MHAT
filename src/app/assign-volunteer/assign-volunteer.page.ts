import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-assign-volunteer',
  templateUrl: './assign-volunteer.page.html',
  styleUrls: ['./assign-volunteer.page.scss'],
})
export class AssignVolunteerPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_list: any = [];
  clinic_name: any = {};
  error_m: any ;
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
          var formData: any = new FormData();
          formData.append("key", "get_patient_by_clinic_volunteer_assign");
          formData.append("clinic_id", this.clinic_id);
          formData.append("user_id", this.user_id);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            //console.log(res);     
            if(res != ''){
              this.patient_list = res;
              this.error_m ="";
                     
            }else{
              this.error_m = "Paitent data not available";
              //console.log(res);
            }
            
            
         });
        }
    }
    async successAlert(msg) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: msg,
        buttons: ['OK']
      });
  
      await alert.present();
    }
    async unassignPatient(patient_id) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: "Are you sure you want to unassgined patient ?",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.unassignPatientConfirm(patient_id);
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
    unassignPatientConfirm(patient_id){
      var formData: any = new FormData();
      formData.append("key", "unassigned_volunteer_by_patient");
      formData.append("patient_id", patient_id);
      this.http.post(this.baseURI+'manage-volunteer-assign.php',formData).subscribe((res) => {
        if(res['status']== 1){ 
          this.toastMessage("Patient unassgined successfully");
          this.ionViewDidEnter();
        }else{
          this.toastMessage("Something went wrong.");
        }
        
        
     });

    }
    searchByKeyword(event){
      var name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "search_patient_by_clinic_volunteer_assign");
      formData.append("clinic_id", this.clinic_id);
      formData.append("name", name);
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
}
