import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-profile-update-log',
  templateUrl: './profile-update-log.page.html',
  styleUrls: ['./profile-update-log.page.scss'],
})
export class ProfileUpdateLogPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  request: any = [];
  error_m: any ;
  constructor(
    private router: Router, 
    public http : HttpClient, 
  ) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
      }
  }
  ionViewWillEnter() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        var formData: any = new FormData();
        formData.append("key", "get_request");
        this.http.post(this.baseURI+'profile-approval-request.php',formData).subscribe((res) => {
          if(res != ''){
            this.error_m = "";
            this.request = res;  
            console.log(this.request);
          }else{
            this.error_m = "Data not available";
            //console.log(res);
          }         
          
       });
      }
  }
}
