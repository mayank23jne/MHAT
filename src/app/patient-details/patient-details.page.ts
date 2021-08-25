import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { File } from "@ionic-native/file/ngx";
import { ViewNotePage } from '../modals/view-note/view-note.page';
import { ViewUpcomingAppointmentPage } from '../modals/view-upcoming-appointment/view-upcoming-appointment.page';
import { PreviewPrescriptionPage } from '../modal/preview-prescription/preview-prescription.page';
import {
  FileTransfer,
  FileTransferObject
 } from "@ionic-native/file-transfer/ngx";
 import { FileOpener } from "@ionic-native/file-opener/ngx";
 import { Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
    import * as XLSX from 'xlsx';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  type: string;
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  role: any = {};
  patient: any = {};
  display: any = {};
  show: any = {};
  patient_id: any = {};
  prescription: any = {};
  pTest : any = {};
  pNotes : any = {};
  pFeedback : any = {};
  private currentNumber = 0;
  patientsymptoms:Array<any> = [];
  prescriptionlist:Array<any> = [];
  dataReturned: any;
  fileURI :string = this.baseURI+'uploads/test_reports/';
  fileTransfer: FileTransferObject;
  type1: string;
  gender_array:any = []
  prefix_array: string[];
  m_status_array: string[];
  cast_array: string[];
  yes_no_array: string[];
  stay_array: string[];
  patient_income_array: string[];
  earning_member_income_array: string[];
  suicide_type_array: any[];
  roof_array: any[];
  drinking_water_source_array: any[];
  religions_array: string[];
  district_array: string[];
  education_array: string[];
  occupation_array: any[];
  earning_member_array: any[] = [];
  relation_with_patient_array: any[];
  which_member_array: any[];
  home_array: string[];
  drinking_distance_array: string[];
  treatment_source_array: string[];
  btn_1 = "button_1";
  btn_2 = "button_2";
  btn_3 = "button_3";
  btn_4 = "submit";
  role_check: any;
  app_id: any;
  datePickerObj: any = {};
  today = new Date();
  child_male: any;
  child_female: any;
  isDisabled: boolean=false;
  isSiblingDisabled: boolean=false;
  isTypeJobDisabled: boolean = false;
  isSuicideDisabled: boolean = false;
  isGovtDisabled: boolean = false;
  isTreatDisabled: boolean = false;
  item_array: any[] = [] ;
  other_mem: any = {};
  page_number = 1;
  start : any = 2;
  start1: any;
  search_name: any = "";
  count_no : any = 0;
  clinic_list: any =[];
  subscribe: any;
  split_trat: any = [];
  constructor(public modalController: ModalController,
              private router: Router,
              public alertController: AlertController, 
              private route: ActivatedRoute,
              public http : HttpClient, 
              public navCtrl: NavController, 
              public menuCtrl: MenuController,
              private fileOpener: FileOpener,
              private transfer: FileTransfer,
              private file: File, 
              public toastController: ToastController,
              private platform: Platform) { 

                
              }


  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'DD-MM-YYYY',
      inputDate:("0" + this.today.getDate()).slice(-2)+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+this.today.getFullYear(),  // default new Date()
      fromDate: new Date('1900-01-01'), // default null
      toDate: new Date('2050-12-31'), // default null
      btnProperties:
      {
      expand : 'block',  // “block” | “full”
      fill : 'solid',             // “clear” | “default” | “outline” | “solid”
      size :'default',      // “default” | “large” | “small”
      disabled :false,   // true | false
      strong :false,      // true | false
      color: '#a6ce39'  // “primary” | “secondary” | “tertiary” |
      // “success” | “warning” | “danger” | “light” | “medium” | “dark”
      },
    };
    this.type = 'general';
    this.type1 = 'step-1';    
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.role = localStorage.getItem("role");
        this.gender_array = ["Male","Female","Other"];
        this.prefix_array = ["Mr.","Mrs.","Ms","Dr.","Master","Baby"];
        this.m_status_array = ["Married","Unmarried","Divorced","Widowed/Widower","Separated"];
        this.cast_array = ["SC","ST","OBC","Others","NA"];
        this.yes_no_array = ["Yes","No"];
        this.stay_array = ["Parents","Siblings","Spouse","Offspring","Relatives","Alone","Parents + Siblings","Parents + Spouse","Parents + Spouse + Offspring","Parents + Spouse + Siblings","Spouse + Offsprings"];
        this.patient_income_array = ["No income","Less than 1000","5000-10000","10000 and above"];
        this.earning_member_income_array = ["0-1000","1000-2000","2000-3000","3000-4000","4000-5000","5000 and Above"];
        this.suicide_type_array = ["NA","Poisoning","Hanging","Drowning","Fire","Others"];
        this.roof_array = ["Hut","Tile","Concrete","Sheet","Others"];
        this.drinking_water_source_array = ["Pipe Water in to the house","Pipe water to the yard or plot","Public tap","Bore Well","Well inside the plot","Community Well","Rain water collection","Vehicle water","Surface water","Own well","Public well","Pond","Public pipe water"];
        this.religions_array = ["Hindu","Muslim","Christain","Others"];
        this.district_array = ["Wayanad","Kozhikode","Malappuram","Palakkad","Alappuzha","Ernakulam","ldukki","Kannur","Kasaragod","Kollam","Kottayam","Pathanamthitta","Thiruvananthpuram","Thrissur"];
        this.education_array = ["Literate","Illiterate","Primary Education","SSLC","Higher Secondary","Graduation","Diploma","Post Graduation","Others"];
        this.occupation_array = ["Employed","Un-Employed"];
        //this.earning_member_array = ["Spouse","Offsprings","Parents","Siblings"];
        this.earning_member_array = [{
          member_names: "Spouse",
          value: '',
          checked:false
        },{
          member_names: "Offsprings",
          value: '',
          checked:false
        },{
          member_names: "Parents",
          value: '',
          checked:false
        },{
          member_names: "Siblings",
          value: '',
          checked:false
        }
      ];
        this.relation_with_patient_array = ["Paternal relations","Maternal relations","Paternal + Maternal relations","No mental illness","Other"];
        this.which_member_array = ["NA","Spouse","Offsprings","Paternal relations","Maternal relations","Paternal + Maternal relations","No mental illness"];
        this.home_array = ["Rented","Own"];
        this.drinking_distance_array = ["0-500m","500-1000m","1000-1500m","1500-2000m"];
        this.treatment_source_array = ["Govt Hospital/Clinic","Pvt Hospital/Clinic","Religious/Faith Healing"];
        
        if(this.role == "doctor"){
          this.display = "display:none";
          this.show = "display:block";
        }else{
          this.show = "display:none";
        }
        
      }

  }
  async exportToExcel(data, filename="prescription_list") {
      
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, filename + '.xlsx');
  }
  ionViewWillEnter() {
    
    this.page_number = 1;
    this.start  = 2;
    this.count_no = 0;
    console.log(this.earning_member_array);
    console.log(this.earning_member_array.length);
    this.role_check =this.route.snapshot.params['id1'];    
        var formData: any = new FormData();
        var formData1: any = new FormData();
        var formData2: any = new FormData();
        var formData3: any = new FormData();
        if(this.role_check != 0){
          this.patient_id =this.route.snapshot.params['id'];
          this.app_id =this.route.snapshot.params['id1'];
          formData.append("key", "get_patient_by_app_id_new");
          formData.append("id", this.app_id);
        }else{
          this.patient_id =this.route.snapshot.params['id'];
          formData.append("key", "get_patient_by_id");
          formData.append("id", this.patient_id);
        }
        
        
        this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
          this.patient = res;
          
          if(this.patient.other_earning_member != null){
            this.earning_member_array = (JSON.parse(this.patient.other_earning_member));
          }else{
            console.log('helo');
          }
          //this.item_array = this.other_mem;
          
          if(this.patient.child == 'No'){
            this.isDisabled = true;
          }if(this.patient.sibling == 'No'){
            this.isSiblingDisabled = true;
          }if(this.patient.occupation == 'Un-Employed'){
            this.isTypeJobDisabled = true;
          }if(this.patient.suicide_commited == 'No'){
            this.isSuicideDisabled = true;
          }if(this.patient.earlier_treatment == 'No'){
            this.isTreatDisabled = true;
          }if(this.patient.pension == 'No'){
            this.isGovtDisabled = true;
          }
          console.log(this.patient.treatment_source);
          if(this.patient.treatment_source !=''){
            this.split_trat = this.patient.treatment_source.split(",");
           
          }
          
          //console.log(this.patient);
          // if(this.patient.child_male=='' || this.patient.child_male=='null'){
          //   this.child_male = 0;
          // }else{
          //   this.child_male = this.patient.child_male;
          //   console.log(this.child_male);
          // }if(this.patient.child_female=='' || this.patient.child_female=='null'){
          //   this.child_female = 0;
          // }else{
          //   this.child_female = this.patient.child_female;
          // }
        });
        formData1.append("key", "patientEntrydateWithLimit");
        formData1.append("id", this.patient_id);
        formData1.append("start", 0);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((data : any) => {
          this.prescriptionlist = [];
          if(data!=null){
          for(var i=0;i<data.length;i++) {
            this.prescriptionlist.push({"entryDate":data[i].createdDate});
            this.prescriptionByDate(i, this.patient_id,data[i].createdDate);
            this.testReportByDate(i, this.patient_id,data[i].createdDate);
            this.notesReportByDate(i, this.patient_id,data[i].createdDate);
            this.feedbackReportByDate(i, this.patient_id,data[i].createdDate);
            //console.log(this.prescriptionlist);
          }
        }
        });

        if(this.role!='doctor'){
        formData3.append("key","check_patient_detail");
        formData3.append("patient_id",this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData3).subscribe((data : any) => {
          if(data['status']==1){
            this.showGeneralPopUp();
          }
          
        });
      }
        formData2.append("key", "all_clinic");
        this.http.post(this.baseURI+'retrive_clinic.php',formData2).subscribe((data : any) => {
          if(data){
            this.clinic_list = data;
            console.log(this.clinic_list)
          }
          
        });
        
        
  }
  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
  }
  makePdf(){
    var formData: any = new FormData();
    //formData.append("key", "get_prescription_by_current_date");
    formData.append("patient_id", this.patient_id);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
    this.http.post(this.baseURI+'generate-prescription.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
        //var file_name = res['data'];
        //window.open(this.baseURI+file_name, '_self');
      this.toastMessage("Generated pdf send to mail successfully.");
      }else{

        this.toastMessage("Something went wrong.");
      }
      })
  }
  
  async showPopup() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Important!',
      message: "Have you updated the following : <br>1.Prescription<br>2.Follow up notes<br>3.Schedule Appointment<br>4.Send to doctor",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.router.navigate(['/patient-list']);
          }
        },
      ],
      backdropDismiss: false 
    });

    await alert.present();
  }
  
  async repeatPrescription(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to repeat ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.repeatById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async repeatAllPrescription(entryDate , patientId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to repeat all ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.repeating_all(entryDate , patientId)
          }
        }
      ]
    });

    await alert.present();
  }
  async deletePrescription(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteTest(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteTestById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteHistory(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteHistoryById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteDiagnosis(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteDiagnosisById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteMorbidity(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteMorbidityById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  
  async deleteNote(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteNoteById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteFeedback(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // window.history.back();
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteFeedbackById(id)
          }
        }
      ]
    });

    await alert.present();
  }
  repeatById(id){
    var formData: any = new FormData();
    formData.append("key", "repeatById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Repeat successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Prescription deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteTestById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-patient-test.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient test deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteHistoryById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteByPatientId");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-patient-history.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient history deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteMorbidityById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteByPatientId");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-patient-co-morbidity.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient co-morbidity deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteDiagnosisById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteByPatientId");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-patient-diagnosis.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient diagnosis deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteNoteById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-note.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient note deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  deleteFeedbackById(id){
    var formData: any = new FormData();
    formData.append("key", "deleteById");
    formData.append("id", id);
    this.http.post(this.baseURI+'manage-feedback.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Patient feedback deleted successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  repeating_all(entryDate , patientId){
    var formData: any = new FormData();
    formData.append("key", "repeatAll");
    formData.append("id", patientId);
    formData.append("entryDate", entryDate);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
     if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
           this.ionViewWillEnter();
            this.toastMessage('Repeat successfully.');
          }else{
            this.toastMessage('Something went wrong.');
          }
        
    })
  }
  prescriptionByDate(no , patient_id , entryDate){
    var formData: any = new FormData();
    formData.append("key", "get_prescription_by_patient_id_date");
    formData.append("patient_id", patient_id);
    formData.append("entry_date", entryDate);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((data1 : any) => {
      for(var i=0;i<data1.length;i++){
        if((data1[i].medicinename == " ") ||(data1[i].medicinename == "")){
        this.prescription = false;
        data1[i].prescription = this.prescription;
       }else{
        this.prescription = true;
        data1[i].prescription = this.prescription;
      } 
      this.prescriptionlist[no].presarray = data1; 
      }
    });
  }
  testReportByDate(no , patient_id , entryDate){
    var formData: any = new FormData();
    formData.append("key", "get_test_by_patient_id_date");
    formData.append("patient_id", patient_id);
    formData.append("entry_date", entryDate);
    this.http.post(this.baseURI+'manage-patient-test.php',formData).subscribe((data1 : any) => {
      for(var i=0;i<data1.length;i++){
        if((data1[i].test == " ")){
        this.pTest = false;
        data1[i].pTest = this.pTest;
       }else{
        this.pTest = true;
        data1[i].pTest = this.pTest;
      } 
      this.prescriptionlist[no].testarray = data1; 
      }
    });
  }
  notesReportByDate(no , patient_id , entryDate){
    console.log("hello");
    var formData: any = new FormData();
    formData.append("key", "get_note_by_patient_id_date");
    formData.append("patient_id", patient_id);
    formData.append("entry_date", entryDate);
    this.http.post(this.baseURI+'manage-note.php',formData).subscribe((data1 : any) => {
      //console.log(data1)
      for(var i=0;i<data1.length;i++){
        if((data1[i].description == " ")){
        this.pNotes = false;
        data1[i].pNotes = this.pNotes;
       }else{
        this.pNotes = true;
        data1[i].pNotes = this.pNotes;
      } 
      this.prescriptionlist[no].notesarray = data1; 
      }
    });
    //console.log(this.prescriptionlist);
  }
  feedbackReportByDate(no , patient_id , entryDate){
    var formData: any = new FormData();
    formData.append("key", "get_feedback_by_patient_id_date");
    formData.append("patient_id", patient_id);
    formData.append("entry_date", entryDate);
    this.http.post(this.baseURI+'manage-feedback.php',formData).subscribe((data1 : any) => {
      //console.log(data1)
      for(var i=0;i<data1.length;i++){
        if((data1[i].feedback_details == " ")){
        this.pFeedback = false;
        data1[i].pFeedback = this.pFeedback;
       }else{
        this.pFeedback = true;
        data1[i].pFeedback = this.pFeedback;
      } 
      this.prescriptionlist[no].feedbacksarray = data1; 
      }
    });
    //console.log(this.prescriptionlist);
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

  patientEditForm(form){
    //console.log(form.value);
    var btn_1 = form.value.btn_1;
    var btn_2 = form.value.btn_2;
    var btn_3 = form.value.btn_3;
    var btn_4 = form.value.btn_4;
    if(btn_1 == "button_1"){
      this.type1 = 'step-2';
    }
    if(btn_2 == "button_2"){
      this.type1 = 'step-3';
      // if(this.checkValue(true, this.earning_member_array) == 'Not exist'){
      //   this.toastMessage('Please check at least one checkbox.');
      // }else if(this.checkValue(true, this.earning_member_array) == 'Exist'){
      //   if(this.checkValue2(true, this.earning_member_array) == 'Not exist'){
      //     this.toastMessage('Please fill respective text box.');
      //   }else{
      //     this.type1 = 'step-3';
      //   }
        
      // }
     
    }
    if(btn_3 == "button_3"){
      this.type1 = 'step-4';

    }
    if(btn_4 == "submit"){
      var formData: any = new FormData();
      formData.append("key", "update-new");
      formData.append("id", this.patient.id);
      formData.append("prefix", this.patient.prefix);
      formData.append("patient_first_name", this.patient.name);
      formData.append("patient_middle_name", this.patient.patient_middle_name);
      formData.append("patient_last_name", this.patient.patient_last_name);
      formData.append("file_no", this.patient.file_no);
      formData.append("phone", this.patient.mobile_no);
      formData.append("external_id", this.patient.external_id);
      formData.append("dob", this.patient.dob);
      formData.append("gender", this.patient.gender);
      formData.append("m_status", this.patient.marital_status);
      formData.append("age", this.patient.age);
      formData.append("religions", this.patient.religions);
      formData.append("caste", this.patient.caste);
      formData.append("house_name", this.patient.house_name);
      formData.append("place", this.patient.place);
      formData.append("district", this.patient.district);
      formData.append("child", this.patient.child);
      formData.append("child_male", this.patient.child_male);
      formData.append("child_female", this.patient.child_female);
      formData.append("child_other", this.patient.child_other);
      formData.append("sibling", this.patient.sibling);
      formData.append("sibling_male", this.patient.sibling_male);
      formData.append("sibling_female", this.patient.sibling_female);
      formData.append("sibling_other", this.patient.sibling_other);
      formData.append("education", this.patient.education);
      formData.append("stay", this.patient.stay);
      formData.append("occupation", this.patient.occupation);
      formData.append("job_type", this.patient.job_type);
      formData.append("patient_income", this.patient.patient_income);
      formData.append("other_earning_member",  JSON.stringify(this.earning_member_array));
      formData.append("income_earning_member", this.patient.income_earning_member);
      formData.append("diagnosis", this.patient.diagnosis);
      formData.append("illness_duration", this.patient.illness_duration);
      formData.append("onset_age", this.patient.onset_age);
      formData.append("mi_family", this.patient.mi_family);
      formData.append("relation_with_patient", this.patient.relation_with_patient);
      formData.append("suicide_commited", this.patient.suicide_commited);
      formData.append("which_member", this.patient.which_member);
      formData.append("suicide_type", this.patient.suicide_type);
      formData.append("earlier_treatment", this.patient.earlier_treatment);
      formData.append("treatment_source", this.split_trat);
      formData.append("election_id", this.patient.election_id);
      formData.append("aadhar_card", this.patient.aadhar_card);
      formData.append("ration_card", this.patient.ration_card);
      formData.append("home", this.patient.home);
      formData.append("roof", this.patient.roof);
      formData.append("disability_certificate", this.patient.disability_certificate);
      formData.append("drinking_distance", this.patient.drinking_distance);
      formData.append("drinking_water_source", this.patient.drinking_water_source);
      formData.append("toilet_facility", this.patient.toilet_facility);
      formData.append("gas_connection", this.patient.gas_connection);
      formData.append("vehicle", this.patient.vehicle);
      formData.append("mobile_phone", this.patient.mobile_phone);
      formData.append("land_phone", this.patient.land_phone);
      formData.append("tv", this.patient.tv);
      formData.append("fridge", this.patient.fridge);
      formData.append("food_kit", this.patient.food_kit);
      formData.append("financial_help", this.patient.financial_help);
      formData.append("kits_occasion", this.patient.kits_occasion);
      formData.append("pension", this.patient.pension);
      formData.append("pension_type", this.patient.pension_type);
      formData.append("health_care", this.patient.health_care);
      formData.append("medicines", this.patient.medicines);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
         if(res['status'] == 1){
                if(this.role_check != 0){
                  this.router.navigate(['/doctor-patient-list']);
                }else{
                this.router.navigate(['/patient-list']);
                }
                this.toastMessage('Patient updated successfully.');
              }else{
                this.toastMessage('Something went wrong.');
              }
            
        })
    }
    // var formData: any = new FormData();
    // formData.append("key", "update");
    // formData.append("patient_name", form.value.name);
    // formData.append("file_no", form.value.file_no);
    // formData.append("age", form.value.age);
    // formData.append("gender", form.value.gender);
    // formData.append("m_status", form.value.m_status);
    // formData.append("p_status", form.value.p_status);
    // formData.append("phone", form.value.phone);
    // formData.append("adhaar", form.value.ad_no);
    // formData.append("occupation", form.value.occupation);
    // formData.append("address", form.value.address);
    // formData.append("city", form.value.city);
    // formData.append("desc", form.value.desc);
    // formData.append("id", form.value.id);
    // this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
    //  if(res['status'] == 1){
    //         this.router.navigate(['/patient-list']);
    //         this.toastMessage('Patient updated successfully.');
    //       }else{
    //         this.toastMessage('Something went wrong.');
    //       }
        
    // })
  
   }
   previous_stage(stage){
    this.type1 = stage;
  }
   async viewAll(noteid) {
    const modal = await this.modalController.create({
      component: ViewNotePage,
      cssClass: 'my-custom-modal',
      backdropDismiss:false,
      componentProps: {
        "paramID": noteid,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  async previewPrescription() {
    const modal = await this.modalController.create({
      component: PreviewPrescriptionPage,
      cssClass: 'my-custom-modal preview-modal',
      backdropDismiss:false,
      componentProps: {
        "clinic_id": this.clinic_id,
        "patient_id": this.patient_id,
        "user_id": this.user_id,
        "app_id": this.app_id,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  async viewUpcomingAppointment() {
    const modal = await this.modalController.create({
      component: ViewUpcomingAppointmentPage,
      cssClass: 'my-custom-modal preview-modal',
      backdropDismiss:false,
      componentProps: {
        "patient_id": this.patient_id,
      }
    });

    return await modal.present();
  }

  sendToClinic(){
    var formData: any = new FormData();
    formData.append("clinic_id", this.clinic_id);
    formData.append("patient_id", this.patient_id);
    formData.append("user_id", this.user_id);
    formData.append("app_id", this.app_id);
    this.http.post(this.baseURI+'prescription_pdf_generator.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
             this.router.navigate(['/doctor-patient-list']);
             this.toastMessage('Send to Clinic Successfull.');
           }else{
             this.toastMessage('Something went wrong.');
           }         
     })
  }
  download(file_name: string) {
    let fileExtn=file_name.split('.').reverse()[0];
    let fileMIMEType=this.getMIMEtype(fileExtn);
         this.fileOpener.open(this.fileURI+ file_name+"", fileMIMEType)
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
    //alert(this.fileURI+url);
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.fileURI+file_name, this.file.dataDirectory + file_name)
    .then(entry => {
    //alert("download complete: " + entry.toURL());
    let fileExtn=file_name.split('.').reverse()[0];
    let fileMIMEType=this.getMIMEtype(fileExtn);
         this.fileOpener.open(entry.toURL()+"", fileMIMEType)
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
    });
    }
    getMIMEtype(extn){
      let ext=extn.toLowerCase();
      let MIMETypes={
        'txt' :'text/plain',
        'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc' : 'application/msword',
        'pdf' : 'application/pdf',
        'jpg' : 'image/jpeg',
        'bmp' : 'image/bmp',
        'png' : 'image/png',
        'xls' : 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'rtf' : 'application/rtf',
        'ppt' : 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
      return MIMETypes[ext];
    }
    async openDatePicker() {
      const datePickerModal = await this.modalController.create({
        component: Ionic4DatepickerModalComponent,
        cssClass: 'li-ionic4-datePicker',
        componentProps: { 
           'objConfig': this.datePickerObj, 
           'selectedDate': this.patient.dob 
        }
      });
      await datePickerModal.present();
  
      datePickerModal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if(data.data!=undefined){
          if(data.data.date != "Invalid date"){
            this.patient.dob  = data.data.date;
          }
          }else{
            this.patient.dob  = this.patient.dob ;
          }
          var b = this.patient.dob.split(/\D/);
          var dob = b.reverse().join('-');
          var today = new Date();
          var birthDate = new Date(dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();        
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
          {
            
              age--;
          }
          this.patient.age = age;
        });
    } 
    private increment (type) {
      if(type=='male'){
        this.child_male++;
      }if(type=='female'){
        this.child_female++;
      }
      
    }
    
    private decrement (type) {
      if(type=='male'){
        if(this.child_male!=0){
          this.child_male--;
        }
      }if(type=='female'){
        if(this.child_female!=0){
          this.child_female--;
        }
      }
      
      
    }
    childrenChange(ev){
      var value = ev.target.value;
      if(value=='No'){
        this.patient.child_female = "";
        this.patient.child_male = "";
        this.patient.child_other = "";
        this.isDisabled = true;
      }else{
        
        this.isDisabled = false;
      }
    }
    siblingChange(ev){
      var value = ev.target.value;
      if(value=='No'){
        this.patient.sibling_female = "";
        this.patient.sibling_male = "";
        this.patient.sibling_other = "";
        this.isSiblingDisabled = true;
      }else{
        
        this.isSiblingDisabled = false;
      }
    }
    occupationChange(ev){
      var value = ev.target.value;
        if(value=='Un-Employed'){
          this.patient.job_type = "";
          this.isTypeJobDisabled = true;
        }else{
          this.isTypeJobDisabled = false;
        }
      }
    suicideChange(ev){
      var value = ev.target.value;
        if(value=='No'){
          this.patient.which_member = "";
          this.patient.suicide_type = "";
          this.isSuicideDisabled = true;
        }else{
          this.isSuicideDisabled = false;
        }
    }
    changeGovt(ev){
      var value = ev.target.value;
        if(value=='No'){
          this.patient.pension_type = "";
          this.isGovtDisabled = true;
        }else{
          this.isGovtDisabled = false;
        }
    }
    changeTreatment(ev){
      var value = ev.target.value;
        if(value=='No'){
          this.patient.treatment_source = "";
          this.isTreatDisabled = true;
        }else{
          this.isTreatDisabled = false;
        }
    }
  async appointmentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: 'There is no appointment scheduled for doctor.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async showGeneralPopUp() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Important',
        message: '<p>The following information related to this patient is incomplete. Please complete this at the earliest: <p><b>Case History<b><br><b>Psychiatric Diagnosis</b><br><b>General Information</b> ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  sendToDoc(patient_id){
    var appointment = this.patient.scheduled_date;
    var appointment_id = this.patient.scheduled_id;
    if(appointment != null && appointment != ''){
      var formData: any = new FormData();
      formData.append("key", 'sent_to_doc_new');
      formData.append("clinic_id", this.clinic_id);
      formData.append("patient_id", patient_id);
      formData.append("user_id", this.user_id);
      formData.append("id", appointment_id);
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
              this.toastMessage('Patient successfully send to doctor.');
        }else if(res['status'] == 2){
              this.toastMessage('Patient already send to doctor.');
        }else{
              this.toastMessage('Something went wrong.');
          }         
      })
     }else{
       this.appointmentAlert();
     }
  }
  getCheckBoxValue(ev,value){
    if(ev.detail.checked == true){
      var i;
      var check = false;

      this.earning_member_array.forEach(function(e){
       // console.log(e.member_names);
        if (e.member_names == value ){
          e["checked"] = true;
        }
      });

      // for (i = 0; i < this.earning_member_array.length; i++) {
      //   if(this.earning_member_array[i]['member_names'] == value){
      //     this.earning_member_array.push({"checked" : true
      //   });
      //   }
      // }
      
    }else{
      console.log("hello,un",value);
     
      this.earning_member_array.forEach(function(e){
        if (e.member_names === value ){
          e["checked"] = false;
          e["value"] = "";
          console.log(e);
        }
      });
      console.log("final",this.earning_member_array);
    }
    //this.earning_val = value;
    
  }
  checkValue(value,arr){
    var status = 'Not exist';
    for(var i=0; i<arr.length; i++){
      var name = arr[i].checked;
      console.log("val",name);
      if(name == value){
        console.log("val",'yes')
        status = 'Exist';
        break;
      }
    }
  
    return status;
  }
  checkValue2(value,arr){
    var status = 'Not exist';
    for(var i=0; i<arr.length; i++){
      var name = arr[i].checked;
      var name_text = arr[i].value;
      if(name == value && name_text != ''){
          status = 'Exist';
          break;
      }
    }
  
    return status;
  }
  doInfinite(event) {
    this.getData(true,event);
  }
  getData(isFirstLoad,event){
    this.count_no++;
    console.log('count',this.count_no);
    this.page_number++;
    this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "patientEntrydateWithLimit");
    formData.append("id", this.patient_id);
    formData.append('start', this.start1);
    this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
      if(res != null){
        //console.log(res);
        //this.service_list = res['data'];
        for (let i = 0; i < res.length; i++) {
          var t;
          if(i==0){
            t = this.count_no * 2;
            //t = t + 1; 
          }else{
            t = (this.count_no * 2)+1;
          }
          
          //console.log(t);
          this.prescriptionlist.push({"entryDate":res[i].createdDate});
            this.prescriptionByDate(t, this.patient_id,res[i].createdDate);
            this.testReportByDate(t, this.patient_id,res[i].createdDate);
            this.notesReportByDate(t, this.patient_id,res[i].createdDate);
            this.feedbackReportByDate(t, this.patient_id,res[i].createdDate);
        }
        //console.log(this.prescriptionlist);            
        //console.log(this.service_list)
        if (isFirstLoad)
          event.target.complete();
       
        //console.log(res['data'].length);
      }else{
        event.target.complete();
      }
      })

    
  }
}
