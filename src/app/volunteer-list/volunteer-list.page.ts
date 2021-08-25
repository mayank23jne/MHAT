import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.page.html',
  styleUrls: ['./volunteer-list.page.scss'],
})
export class VolunteerListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  volunteer_list: any = [];
  clinic_name: any = {};
  patient_id: any = {};
  error_m: any ;
  patient_name: any = {};
  constructor(private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
          this.clinic_name = res['name'];
        });
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_by_id_check_old_new");
        formData1.append("id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.patient_name = res1.patient_name;
              console.log(this.patient_name);
            }else{
              //console.log('hello');
              this.patient_name = '';
            }
              
          })
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
          formData.append("key", "get_all_volunteer");
          formData.append("clinic_id", this.clinic_id);
          this.http.post(this.baseURI+'manage-volunteer.php',formData).subscribe((res) => {
            if(res != ''){
              this.volunteer_list = res;
              //console.log(res);            
            }else{
              this.error_m = "Volunteer data not available";
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
    assignPatient(id){
      var formData: any = new FormData();
      formData.append("key", "assign_patient_to_volunteer");
      formData.append("user_id", this.user_id);
      formData.append("clinic_id", this.clinic_id);
      formData.append("patient_id", this.patient_id);
      formData.append("volunteer_id", id);
      formData.append("doctor_id", 0);
      this.http.post(this.baseURI+'manage-volunteer-assign.php',formData).subscribe((res) => {
        if(res['status']== 1){     
          window.history.back();
          this.toastMessage("Patient successfully assigned to volunteer.");
        }else if(res['status']== 2){
          window.history.back();
          this.toastMessage("Patient already assigned to volunteer.");
        }else{
          this.toastMessage("Something went wrong.");
        }       
        
     });
      
    }

}
