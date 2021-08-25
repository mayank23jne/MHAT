import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-co-morbidity',
  templateUrl: './co-morbidity.page.html',
  styleUrls: ['./co-morbidity.page.scss'],
})
export class CoMorbidityPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  morbidity : any = {};
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
        this.http.post(this.baseURI+'manage-patient-co-morbidity.php',formData).subscribe((res : any) => {
          if(res!=''){
              //console.log(res);
              this.morbidity = res;
              this.btnTextName = 'Update';
            }else{
              //console.log('hello');
              this.btnTextName = 'Add';
            }
              
          })
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_by_id");
        formData1.append("id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          //console.log(res1);
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
    patientForm(form){
    var formData: any = new FormData();
    formData.append("key", "create");
    formData.append("patient_id", this.patient_id);
    formData.append("user_id", this.user_id);
    formData.append("desc", form.value.desc);
    this.http.post(this.baseURI+'manage-patient-co-morbidity.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
        if(res['msg'] == 'add'){
          this.toastMessage("Patient co-morbidity added successfully.");
          window.history.back();
        }else{
          this.toastMessage("Patient co-morbidity updated successfully.");
          window.history.back();
        }
          
        }else{
          this.toastMessage("Something went wrong.");
        }
          
      })
  }

}
