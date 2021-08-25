import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  user_id: any = {};
  baseURI :string = environment.app_url;
  constructor(public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = (localStorage.getItem("user_id"));
      if (user_id === null) {
        this.navCtrl.navigateBack("/sign-in");
      } else {
        this.user_id = user_id;
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
  changePassword(form){
    var old_pass = form.value.old_pass;
    var new_pass = form.value.new_pass;
    var c_pass = form.value.c_pass;
    var id = this.user_id;
    let detail = JSON.stringify({'old_pass': old_pass , 'password' : new_pass , 'id' : id });
    if(new_pass == c_pass){
    this.http.post(this.baseURI+'change-password.php',detail).subscribe((res : any) => {
      if(res.length == 0){
          this.toastMessage('You entered wrong old password.');
        }else{
          if(res['status'] == 1){
            this.toastMessage('Password update successfully.');
            $("#changePasswordform")[0].reset();
          }else{
            this.toastMessage('Something went wrong.');
          }
        }
    })
  }else{
    this.toastMessage('Plase enter re-type password same as new password.');
  }
  }

}
