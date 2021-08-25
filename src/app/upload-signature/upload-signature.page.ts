import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-upload-signature',
  templateUrl: './upload-signature.page.html',
  styleUrls: ['./upload-signature.page.scss'],
})
export class UploadSignaturePage implements OnInit {
  user_id: any = {};
  profile: any = {};
  img1 : any = [];
  baseURI :string = environment.app_url;
  role: string;
  constructor(public http : HttpClient, public navCtrl: NavController,  public toastController: ToastController) { }

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
    var formData: any = new FormData();
    formData.append("id", this.user_id);
    formData.append("signature", file);
    formData.append("old_file", this.profile.signature);
    formData.append("key", 'signature_upload');
    this.http.post(this.baseURI+'profile-update.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){     
            this.toastMessage('Signature updated successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  
  }
  
}
