import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-update-supervisor-feedback',
  templateUrl: './update-supervisor-feedback.page.html',
  styleUrls: ['./update-supervisor-feedback.page.scss'],
})
export class UpdateSupervisorFeedbackPage implements OnInit {

  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  feedback_id: any = {};
  feedback : any = {};
  patient_name : any = {};
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.feedback_id =this.route.snapshot.params['id'];        
        var formData1: any = new FormData();
        formData1.append("key", "get_feedback_by_id");
        formData1.append("id", this.feedback_id);
        this.http.post(this.baseURI+'manage-feedback.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              this.feedback = res1;
            }else{
              this.feedback = '';
            }
              
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
  patientFeedbackForm(form){
    var formData: any = new FormData();
    formData.append("key", "update_feedback_by_id");
    formData.append("id", this.feedback_id);
    formData.append("user_id", this.user_id);
    formData.append("desc", form.value.desc);
    this.http.post(this.baseURI+'manage-feedback.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
          this.toastMessage("Feedback updated successfully.");
          window.history.back();          
        }else{
          this.toastMessage("Something went wrong.");
        }
          
      })
  }

}
