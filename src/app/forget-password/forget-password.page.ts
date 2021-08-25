import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
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
  forgetPassword(form){
    var email = form.value.email;
    let detail = JSON.stringify({'email': email });
    this.http.post(this.baseURI+'forget-password.php',detail).subscribe((res : any) => {
      if(res.length == 0){
        this.toastMessage('This email id is not registered.');
      }else{
        if(res['status'] == 1){
          this.navCtrl.navigateRoot("/reset-password");
        }else{
          this.toastMessage('Something went wrong.');
        }
      }
    })
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
