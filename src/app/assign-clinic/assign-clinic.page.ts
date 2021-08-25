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
  selector: 'app-assign-clinic',
  templateUrl: './assign-clinic.page.html',
  styleUrls: ['./assign-clinic.page.scss'],
})
export class AssignClinicPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  clinic_list: any = [];
  doctor_list: any = [];
  selectedArray :any = [];
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.http.get(this.baseURI+'retrive_clinic.php').subscribe((res : any) => {
        if(res){
                this.clinic_list = res;
              }
            
        })
        var formData: any = new FormData();
        formData.append("key", "get_doctor_all_asc");
        this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res : any) => {
          if(res){
                  this.doctor_list = res;
                }
              
          })
        }
    }
    getDoctor(ev,id){
      if (ev.detail.checked == true) {
         this.selectedArray.push(id);
       console.log("if",this.selectedArray);
       } else {
        let newArray = this.selectedArray.filter(function(el) {
          return el !== id;
       });
        this.selectedArray = newArray;
        console.log("else",this.selectedArray);
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
    addAssignDoctorForm(form){
      var formData: any = new FormData();
      formData.append("key", "assign_doctor_to_clinic");
      formData.append("clinic", form.value.clinic_name.id);
      formData.append("doctor", this.selectedArray);
      this.http.post(this.baseURI+'manage-clinic-doctor-map.php',formData).subscribe((res : any) => {
        if(res['status']==1){
          $("#p_form")[0].reset();
          this.router.navigate(['/assign-doctor-list']);
          this.toastMessage("Doctor assigned succesfully.");
          }else if(res['status']==2){
            this.toastMessage("Doctor already assigned to this clinic.");
          }else{
            this.toastMessage("Something went wrong..");
          }
            
        })
    }
}
