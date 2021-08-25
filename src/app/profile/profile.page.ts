import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { EventService } from '../service/event.service'
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_id: any = {};
  profile: any = {};
  img1 : any = [];
  baseURI :string = environment.app_url;
  role: string;
  constructor(public event : EventService,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = (localStorage.getItem("user_id"));
      if (user_id === null) {
        this.navCtrl.navigateBack("/sign-in");
      } else {
        this.user_id = user_id;
        this.role = (localStorage.getItem("role"));
        let post_id = JSON.stringify({'id': this.user_id});
        this.http.post(this.baseURI+'retrive-profile.php',post_id).subscribe((res : any) => {
          this.profile  = res;
          console.log(this.profile);
        })
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

   fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  
  }

   profilForm(form){
    var img = "";
    if($('input[type=file]')[0].files[0] == undefined){
      img = "";
    }else{
      img = $('input[type=file]')[0].files[0];
    }
    var formData: any = new FormData();
    formData.append("full_name", form.value.full_name);
	  formData.append("email", form.value.email);
	  formData.append("address", form.value.address);
    formData.append("phone", form.value.phone);
    formData.append("age", form.value.age);
    formData.append("old_file", form.value.old_image);
    formData.append("designation", form.value.designation);
	  formData.append("id", this.user_id);
	  formData.append("role", this.role);
	  formData.append("logo", img);
    this.http.post(this.baseURI+'profile-update.php',formData).subscribe((res : any) => {
      console.log(res)
     if(res['status'] == 1){
      this.profile = res['data'];
      this.img1 = "";
      this.event.publish('userprofile:created', res['data']);
      if(this.role != 'clinicadmin'){      
        this.toastMessage('Wait for admin approval.');
      }else{
        this.toastMessage('Profile updated successfully.');
      }
      }else if(res['status'] == 2){
        this.toastMessage('Enter unique email.');
      }else if(res['status'] == 3){
        this.toastMessage(res['data']);
      }else{
        this.toastMessage('Something went wrong.');
      }
        
    })
  
   }
}
