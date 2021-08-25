import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.page.html',
  styleUrls: ['./add-diagnosis.page.scss'],
})
export class AddDiagnosisPage implements OnInit {

  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  diagnosis : any = {};
  btnTextName : any = {};
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
        var formData: any = new FormData();
        formData.append("key", "get_by_id");
        formData.append("patient_id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient-diagnosis.php',formData).subscribe((res : any) => {
          if(res!=''){
              //console.log(res);
              this.diagnosis = res;
              this.btnTextName = 'Update Diagnosis';
            }else{
              //console.log('hello');
              this.btnTextName = 'Add Diagnosis';
            }
              
          })
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
  async toastMessage(msg) {
    const toast = await this.toastController.create({
        message: msg,
        duration: 6000,
        position: "bottom",
        cssClass: "my-custom-class-new"
      });
      toast.present();
    }

  patientDiagnosisForm(form){
    var formData: any = new FormData();
    formData.append("key", "create");
    formData.append("patient_id", this.patient_id);
    formData.append("user_id", this.user_id);
    formData.append("desc", form.value.desc);
    this.http.post(this.baseURI+'manage-patient-diagnosis.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
        if(res['msg'] == 'add'){
          this.toastMessage("Patient diagnosis added successfully.");
          window.history.back();
        }else{
          this.toastMessage("Patient diagnosis updated successfully.");
          window.history.back();
        }
          
        }else{
          this.toastMessage("Something went wrong.");
        }
          
      })
  }

}
