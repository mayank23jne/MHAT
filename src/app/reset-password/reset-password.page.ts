import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  baseURI :string = environment.app_url;
  constructor(public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

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
  resetPassword(form){
    var code = form.value.code;
    var new_pass = form.value.new_pass;
    var c_pass = form.value.c_pass;
    let detail = JSON.stringify({'code': code , 'password' : new_pass });
    if(new_pass == c_pass){
    this.http.post(this.baseURI+'reset-password.php',detail).subscribe((res : any) => {
      if(res.length == 0){
          this.toastMessage('You entered wrong code.');
        }else{
          if(res['status'] == 1){
            this.navCtrl.navigateRoot("/sign-in");
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
