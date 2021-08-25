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
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.page.html',
  styleUrls: ['./edit-prescription.page.scss'],
})
export class EditPrescriptionPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  pres_id: any = {};
  prescription: any = [];
  patient_prescription: any = [];
  prescription_id: any = [];
  test:any[]=[];
  duration:string;
  timeduration:any[]=[];
  medicineunits:any[]=[];
  Isduration:boolean=false;
  plan_1:any='0';
  plan_2:any='0';
  plan_3:any='0';
  patient_name : any = {};
  plan_name_type : any = "";
  d_1:any= '0';
  d_2:any='0';
  d_3:any='0';
  d_4:any='0';
  d_5:any='0';
  d_6:any='0';
  d_7:any='0';
  constructor(public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.pres_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("key", "get_patient_prescription_by_id");
        formData.append("id", this.pres_id);
        this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res){
                this.patient_prescription = res;
                this.plan_name_type = this.patient_prescription.plan_type; 
                this.test = (this.patient_prescription.durationnumber);
                var dailyplan =   this.patient_prescription.dailyplan.split("-");
                if(this.plan_name_type=='1 week' || this.plan_name_type=='2 weeks' || this.plan_name_type=='3 weeks' || this.plan_name_type=='4 weeks' || this.plan_name_type=='monthly'){
                  this.d_1 = this.patient_prescription.dailyplan;
                  this.test = [];
                  this.patient_prescription.duration = "";
                  
                }else{
                  this.plan_1 = dailyplan[0];
                  this.plan_2 = dailyplan[1];
                  this.plan_3 = dailyplan[2];
                }
                
                if(this.patient_prescription.duration!=null){
                  this.selectedNotify(this.patient_prescription.duration);
                }
                
                var punits =   this.patient_prescription.presc_unit.split(",");
                if(this.medicineunits.length > 0){
                  this.medicineunits.length=0;
                }
                for(var i = 0; i < punits.length; i++)
                {
                  this.medicineunits.push(punits[i]);
                }
                var formData_new: any = new FormData();
                formData_new.append("key", "get_prescription_by_id");
                formData_new.append("id", this.patient_prescription.presc_id);
                this.http.post(this.baseURI+'manage-prescription.php',formData_new).subscribe((res2 : any) => {
                if(res2){
                  this.prescription_id = res2;
                }
              })
              var formData1: any = new FormData();
              formData1.append("key", "get_patient_name_by_id");
              formData1.append("id", this.patient_prescription.patient_id);
              this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
                if(res1!=''){
                    //console.log(res);
                    this.patient_name = res1;
                  }else{
                    //console.log('hello');
                    this.patient_name = '';
                  }
                    
                })
               // console.log(this.patient_prescription.presc_id);
              }
            
        })
        var formData1: any = new FormData();
        formData1.append("key", "get_all_prescription");
        this.http.post(this.baseURI+'manage-prescription.php',formData1).subscribe((res1 : any) => {
        if(res1){
                this.prescription = res1;
              }
            
        })
        
  }
    }
    selectPlanType(ev){
      this.plan_name_type = ev.target.value;
    }
    notify(event): void{ 
      this.Isduration =true;
      if(event.detail.value == 'days'){
        this.timeduration.length=0;
        for(let i=1; i < 51; i++){ // n is array.length
          this.timeduration.push(i);   
          //console.log(this.timeduration);
       }
      }
      if(event.detail.value == 'weeks'){
        this.timeduration.length=0;
        for(let i=1; i < 11; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
      }
      if(event.detail.value == 'months'){
        this.timeduration.length=0;
        for(let i=1; i < 13; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
      }
      if(event.detail.value == 'years'){
        this.timeduration.length=0;
        for(let i=1; i < 21; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
      }
     }

     selectedNotify(event): void{ 
      this.Isduration =true;
      if(event == 'days'){
        this.timeduration.length=0;
        for(let i=1; i < 51; i++){ // n is array.length
          this.timeduration.push(i);   
          //console.log(this.timeduration);
       }
      }
      if(event == 'weeks'){
        this.timeduration.length=0;
        for(let i=1; i < 11; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
      }
      if(event == 'months'){
        this.timeduration.length=0;
        for(let i=1; i < 13; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
      }
      if(event == 'years'){
        this.timeduration.length=0;
        for(let i=1; i < 21; i++){ // n is array.length
          this.timeduration.push(i);
          //console.log(this.timeduration);
       }
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
     prescriptionChange(event: {
      component: IonicSelectableComponent,
      value: any
      }) {
      var id = event.value.id;
      var formData: any = new FormData();
      formData.append("key", "get_prescription_by_id");
      formData.append("id", id);
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
      if(res){
              this.patient_prescription.units = "";
              var punits =   res.units.split(",");
              if(this.medicineunits.length > 0){
                this.medicineunits.length=0;
              }
              for(var i = 0; i < punits.length; i++)
              {
                this.medicineunits.push(punits[i]);
              }
            }
          
      })
    }

    editPrescriptionForm(form){
      var dailyplan = form.value.plan_1+'-'+form.value.plan_2+'-'+form.value.plan_3;
      var weeklyplan = form.value.d_1;
      if(form.value.plan_1==0 && form.value.plan_2 ==0 && form.value.plan_3 ==0 && this.plan_name_type=='daily'){
        this.toastMessage("Please select at least one parameter under Daily Plan.");
      }else if(form.value.d_1==0 && (this.plan_name_type=='1 week' || this.plan_name_type=='2 weeks' || this.plan_name_type=='3 weeks' || this.plan_name_type=='4 weeks' || this.plan_name_type=='monthly')){
        this.toastMessage("Please select at least one parameter under Weekly Plan.");
      }else{
      if((this.plan_name_type=='1 week' || this.plan_name_type=='2 weeks' || this.plan_name_type=='3 weeks' || this.plan_name_type=='4 weeks' || this.plan_name_type=='monthly')){
        dailyplan = weeklyplan;
      }
      var formData: any = new FormData();
      formData.append("key", "update");
      formData.append("user_id", this.user_id);
      formData.append("id", this.pres_id);
      formData.append("clinic_id", this.clinic_id);
      formData.append("clinic_by", 0);
      formData.append("sent_to_doc", 0);
      formData.append("medicine", form.value.pre_name.name);
      formData.append("units", form.value.m_unit);
      formData.append("dosage", form.value.dose);
      formData.append("dailyplan", dailyplan);
      formData.append("plan_type", this.plan_name_type);
      formData.append("duration", this.patient_prescription.duration);
      formData.append("durationnumber", this.test);
      formData.append("desc", form.value.desc);
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
            $("#p_form")[0].reset();
            this.toastMessage("Prescription Updated to List.");
            window.history.back();
          }else{
            this.toastMessage("Something went wrong.");
          }
            
        })
    }
  }

}
