import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {EventService} from '../service/event.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
baseURI :string = environment.app_url;
showclinicList:boolean=false;
clinic : any = [];
clinic_n: any = null;
clinic_name: any = null;
subscription: any = {};
role_1: any = {};
u_name:any="";
  constructor(private fcm: FCM,public platform: Platform,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController,public event : EventService, public toastController: ToastController) { }
  public type = 'password';
  public showPass = false;
  showPassword() {
	 this.showPass = !this.showPass;
	 if(this.showPass){
	   this.type = 'text';
	 } else {
	   this.type = 'password';
	 }
  }
	

  ngOnInit() {

		if (localStorage.getItem("user_id") === null) {
			this.navCtrl.navigateRoot("/sign-in");
		  } else {
			  this.role_1 = localStorage.getItem("role");
			  this.navCtrl.navigateRoot("/home");
		  }

	}
	
	clinicChange(event: {
		component: IonicSelectableComponent,
		value: any
		}) {
		//console.log('port:', event.value.id);
	}
  
	selectRole(role){
		if(role == 'clinician' || role == 'doctor'){
			this.clinic_n = null;
			if(role == 'doctor'){
				var formData: any = new FormData();
				formData.append("key", "get_clinic_by_doctor");
				formData.append("username",this.u_name );
				this.http.post(this.baseURI+'manage-clinic.php',formData).subscribe((res1) => {
					this.clinic = res1;
				});
			}else{
				var formData: any = new FormData();
				formData.append("key", "all_clinic");
				this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
					this.clinic = res;
				});
			}
			
			this.showclinicList = true;
		}else{
			this.clinic_n = null;
			this.showclinicList = false;
		}
	}
	
	ionViewDidEnter() {
		document.addEventListener("backbutton",function(e) {
		  console.log("disable back button")
		}, false);
		
	  }
	  
	ionViewWillEnter() {
	  
		this.menuCtrl.enable(false);
		this.subscription = this.platform.backButton.subscribeWithPriority(
		  999990,
		  () => {
			//navigator['app'].exitApp();
			console.log("currentpage1");
		  }
		);
		console.log(this.subscription);
		if (localStorage.getItem("user_id") === null) {
		  this.navCtrl.navigateRoot("/sign-in");
		} else {
			this.role_1 = localStorage.getItem("role");
			this.navCtrl.navigateRoot("/home");
		}
	  }
	
	  ionViewWillLeave() {
		this.menuCtrl.enable(true);
		this.subscription.unsubscribe();
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
	
	login(form){

		var u_name = this.u_name;
		var password = form.value.password;
		var role = form.value.role;
		if(role == 'clinician' || role == 'doctor'){
			this.clinic_name = form.value.clinic_n.id;
		}else{
			this.clinic_name = 0;
		}
		
		//console.log(this.clinic_name);
		let login_data = JSON.stringify({'username': u_name,'password':password, 'role' : role });
		this.http.post(this.baseURI+'user-data.php',login_data).subscribe((res : any) => {
			if(res.length == 0){
				this.toastMessage("Not a valid user");
			}else{
				
				  localStorage.setItem("role", res[0].role);
				  localStorage.setItem("user_id", res[0].id);
				  localStorage.setItem("clinic_id", this.clinic_name);
				  localStorage.setItem("email", res[0].email);
				  localStorage.setItem("username", res[0].username);
				  localStorage.setItem("profile_image", res[0].profile_image);
				  if (typeof this.fcm != 'undefined') {
					this.fcm.getToken().then(token => {
					localStorage.setItem('token_id',(token));
					var formData: any = new FormData();
					formData.append("key", "update_token");
					formData.append("user_id", res[0].id);
					formData.append("token", token);
					this.http.post(this.baseURI+'device_token.php',formData).subscribe((res1 : any) => {
						//alert(res['status']);
					})
										
					}, (error) => {
					console.log('error retrieving token: ' + error);
				
					});
				}
				  this.event.publish('user:login', {
				  });
				  if(role == 'doctor'){
					this.navCtrl.navigateRoot('/doctor-patient-list');
				  }else if(role == 'volunteer'){
					this.navCtrl.navigateRoot('/volunteer-patient');
				  }else if(role == 'clinician'){
					this.navCtrl.navigateRoot('/todays-appointment');
				  }else if(role == 'clinicadmin'){
					this.navCtrl.navigateRoot('/todays-appointment');
				}
			}
        });
	}
  

}
