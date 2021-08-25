import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { MedicineModalPage } from '../modals/medicine-modal/medicine-modal.page';
declare var $: any;
@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html',
  styleUrls: ['./add-prescription.page.scss'],
})
export class AddPrescriptionPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  prescription: any = [];
  duration:any = "";
  durationnumber:any = "";
  timeduration:any[]=[];
  medicineunits:any[]=[];
  Isduration:boolean=false;
  plan_1:any='0';
  plan_2:any='0';
  plan_3:any='0';
  d_1:any='0';
  dataReturned: any;
  patient_name : any = {};
  plan_type_name : any = "";
  constructor(public modalController: ModalController,public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id =this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("key", "get_all_prescription");
        this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res){
                this.prescription = res;
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

    async openModal() {
      const modal = await this.modalController.create({
        component: MedicineModalPage,
        cssClass: 'my-custom-modal',
        backdropDismiss:false,
        componentProps: {
          "paramID": this.patient_id,
        }
      });
  
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          this.dataReturned = dataReturned.data;
          console.log(this.dataReturned);
          this.prescription.push(this.dataReturned);
        }
      });
  
      return await modal.present();
    }

    async addMorePrescription(msg) {
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
              this.plan_1='0';
              this.plan_2='0';
              this.plan_3='0';
              this.d_1 = '0';
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    selectPlanType(ev){
      this.plan_type_name = ev.target.value; 
      //alert(this.plan_type_name)
      
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

    addPrescriptionForm(form){
      var dailyplan = form.value.plan_1+'-'+form.value.plan_2+'-'+form.value.plan_3;
      var weeklyplan = form.value.d_1;
      if(form.value.plan_1==0 && form.value.plan_2 ==0 && form.value.plan_3 ==0 && this.plan_type_name=='daily'){
        this.toastMessage("Please select at least one parameter under Daily Plan.");
      }else if(form.value.d_1==0 && (this.plan_type_name=='1 week' || this.plan_type_name=='2 weeks' || this.plan_type_name=='3 weeks' || this.plan_type_name=='4 weeks' || this.plan_type_name=='monthly')){
        this.toastMessage("Please select at least one parameter under Weekly Plan.");
      }else{
      if(this.plan_type_name=='1 week' || this.plan_type_name=='2 weeks' || this.plan_type_name=='3 weeks' || this.plan_type_name=='4 weeks' || this.plan_type_name=='monthly'){
        dailyplan = weeklyplan;
      }
      var formData: any = new FormData();
      formData.append("key", "create");
      formData.append("patient_id", this.patient_id);
      formData.append("user_id", this.user_id);
      formData.append("clinic_id", this.clinic_id);
      formData.append("clinic_by", 0);
      formData.append("sent_to_doc", 0);
      formData.append("medicine", form.value.pre_name.name);
      formData.append("units", form.value.m_unit);
      formData.append("dosage", form.value.dose);
      formData.append("dailyplan", dailyplan);
      formData.append("duration", this.duration);
      formData.append("plan_type", this.plan_type_name);
      formData.append("durationnumber", this.durationnumber);
      if(form.value.desc == undefined){
        formData.append("desc", "");
      }else{
        formData.append("desc", form.value.desc);
      }
      
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
            $("#p_form")[0].reset();
            this.toastMessage("Prescription Added to List.");
            this.addMorePrescription("Do you want to add more prescription?");
          }else{
            this.toastMessage("Something went wrong.");
          }
            
        })
    }
  }

}
