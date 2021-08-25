import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-assigned-patient-list',
  templateUrl: './assigned-patient-list.page.html',
  styleUrls: ['./assigned-patient-list.page.scss'],
})
export class AssignedPatientListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  volunteer_id: any;
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }


  ngOnInit() {
    this.volunteer_id =this.route.snapshot.params['id'];
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
          formData.append("key", "get_assigned_patient_list");
          formData.append("clinic_id", this.clinic_id);
          formData.append("id", this.volunteer_id);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            if(res != ''){
              this.patient_list = res;
              this.error_m ="";
              console.log(this.patient_list);
                     
            }else{
              this.error_m = "Data not available";
            }
            
            
         });
        }
    }
}
