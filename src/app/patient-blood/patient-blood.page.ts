import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-patient-blood',
  templateUrl: './patient-blood.page.html',
  styleUrls: ['./patient-blood.page.scss'],
})
export class PatientBloodPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  patient_name : any = {};
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id =this.route.snapshot.params['id'];
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_by_id");
        formData1.append("id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.patient_name = res1;
            }else{
              //console.log('hello');
              this.patient_name = '';
            }
              
          })
        }
  }
  async addMoreTest(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            window.history.back();
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
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
      formData.append("key", "create");
      formData.append("patient_id", this.patient_id);
      formData.append("user_id", this.user_id);
      formData.append("test", form.value.test);
      formData.append("test_level", form.value.test_level);
      formData.append("attachment", $('input[type=file]')[0].files[0]);
      this.http.post(this.baseURI+'manage-patient-test.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
            $("#p_form")[0].reset();
            this.toastMessage("Test Added to List.");
            this.addMoreTest("Do you want to add more test?");
          }else{
            this.toastMessage("Something went wrong.");
          }
            
        })
  }
}
