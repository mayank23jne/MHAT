import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-edit-patient-blood',
  templateUrl: './edit-patient-blood.page.html',
  styleUrls: ['./edit-patient-blood.page.scss'],
})
export class EditPatientBloodPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  test_id: any = {};
  test_data: any = {};
  patient_name : any = {};
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.test_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("key", "get_test_by_id");
        formData.append("id", this.test_id);
        this.http.post(this.baseURI+'manage-patient-test.php',formData).subscribe((res : any) => {
        this.test_data = res;
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_by_id");
        formData1.append("id", this.test_data.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.patient_name = res1;
            }else{
              //console.log('hello');
              this.patient_name = '';
            }
              
          })
        
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
   patientTestForm(form){
    var formData: any = new FormData();
    formData.append("key", "update");
    formData.append("id", this.test_id);
    formData.append("user_id", this.user_id);
    formData.append("test", form.value.test);
    formData.append("test_level", form.value.test_level);
    formData.append("old_report", form.value.old_report);
    formData.append("attachment", $('input[type=file]')[0].files[0]);
    this.http.post(this.baseURI+'manage-patient-test.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
          $("#p_form")[0].reset();
          this.toastMessage("Test Updated to List.");
          window.history.back();
        }else{
          this.toastMessage("Something went wrong.");

        }
          
      })
}
}
