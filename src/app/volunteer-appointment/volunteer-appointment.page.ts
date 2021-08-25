import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-volunteer-appointment',
  templateUrl: './volunteer-appointment.page.html',
  styleUrls: ['./volunteer-appointment.page.scss'],
})
export class VolunteerAppointmentPage implements OnInit {
  type: string;
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  error_m: any ;
  upcoming_list: any = [];
  constructor(private router: Router,public alertController: AlertController, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    this.type = 'upcoming';
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
        this.clinic_id = localStorage.getItem("clinic_id");
        var formData: any = new FormData();
        formData.append("key", "get_assign_volunteer_by_clinic");
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'manage-volunteer-assign.php',formData).subscribe((res) => {
          if(res != ''){
            this.upcoming_list = res;
            this.error_m = "";
            console.log(res);            
          }else{
            this.upcoming_list = [];
            this.error_m = "Data not available";
            console.log(res);
          }
          
          
       });
      }
  }
}
