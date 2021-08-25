import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router , ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile-log-detail',
  templateUrl: './profile-log-detail.page.html',
  styleUrls: ['./profile-log-detail.page.scss'],
})
export class ProfileLogDetailPage implements OnInit {

  baseURI :string = environment.app_url;
  fileURI :string = environment.file_url;
  user_id: any = {};
  req_id: any = {};
  profile_id: any = {};
  old_detail: any = [];
  new_detail: any = [];
  error_m: any ;
  role: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public toastController: ToastController,
              public http : HttpClient
              ) { }
  ngOnInit() {
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
  ionViewDidEnter() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.req_id = this.route.snapshot.params['id'];
        this.profile_id = this.route.snapshot.params['id2'];
        var formData: any = new FormData();
        formData.append("key", "get_profile_by_id");
        formData.append("request_id", this.req_id);
        formData.append("profile_id", this.req_id);
        this.http.post(this.baseURI+'profile-approval-request.php',formData).subscribe((res) => {
          if(res != ''){
            this.new_detail = res; 
            console.log(this.new_detail);      
          }         
          
       });
      }
  }
  approveProfile(user_id , request_id){
    var formData: any = new FormData();
      formData.append("key", "profile_approved");
      formData.append("request_id", request_id);
      formData.append("profile_id", user_id);
      this.http.post(this.baseURI+'profile-approval-request.php',formData).subscribe((res) => {
        if(res['status'] == 1){
          this.toastMessage('Profile approved successfully.');
          this.router.navigate(['/todays-appointment']);
        }else{
          this.toastMessage('Something went wrong.');
        }                 
          
      });
  }
}
