import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController , ModalController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import {  Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
declare var $: any;
@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.page.html',
  styleUrls: ['./reschedule-appointment.page.scss'],
})
export class RescheduleAppointmentPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  appointment_id: any = {};
  doctor_list: any = [];
  patient_name : any = {};
  myDate:string;
  myTime:string;
  appointment_details: any =[];
  myDateNTime:string;
  check_browser: string = "no";
  datePickerObj : any = {};
  today = new Date();
  constructor(private modalCtrl : ModalController , private datePicker: DatePicker,private router: Router,public alertController: AlertController, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      var self = this;
      document.addEventListener('deviceready', () => {
        self.check_browser = "yes";
      });
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
  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD',
      inputDate:this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default new Date()
      fromDate: this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default null
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
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.appointment_id =this.route.snapshot.params['id'];
        var formData1: any = new FormData();
        formData1.append("key", "get_appointment_by_id");
        formData1.append("id", this.appointment_id);
        this.http.post(this.baseURI+'manage-appointment.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              this.appointment_details = res1;
              this.myDate = res1['date'];
              this.myTime = res1['time'];
            }else{
              this.appointment_details = [];
            }
              
          })
          // var formData: any = new FormData();
          // formData.append("key", "get_doctor_by_clinic_id");
          // formData.append("clinic_id", this.clinic_id);
          // this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res) => {
          //   if(res != ''){
          //     this.doctor_list = res; 
          //     console.log(this.doctor_list);  
          //   }
          // })        
      }
  }
  patientAppointmentForm(form){  
    var formData: any = new FormData();
    formData.append("key", "update_appointment_by_id");
    formData.append("id", this.appointment_id);
    formData.append("doctor_id", 0);
    formData.append("date", this.myDate);
    formData.append("time", this.myTime);
    formData.append("clinic_id", this.clinic_id);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
      if(res['status']==1){
        this.toastMessage("Appointment re-scheduled successfully.");
        this.router.navigate(['/appointment-list']);
      }else if(res['status'] == 2){
        this.toastMessage("Time slot is not avaolable.");
        window.history.back();
      }else{
        this.toastMessage("Something went wrong.");
      }
    });
  }
  showDatepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      allowOldDates : false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      okText:"Save Date",
      todayText:"Set Today"
    }).then(
      date => {
        this.myDate = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }  


  showTimepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      is24Hour : false,      
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      okText:"Save Time",
      nowText:"Set Now"
    }).then(
      time => {
        this.myTime =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }  
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  getDate(ev){
    var date1 = ev.target.value;
    var date = new Date(date1);
    this.myDate = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
    $("#t_date").hide();
  }
  getTime(ev){
    var date1 = ev.target.value;
    var date = new Date(date1);
    this.myTime = this.formatAMPM(date);
    $("#t_time").hide();
  }

  myFun(){
    this.openDatePicker();
  }
  
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.myDate 
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data.date != "Invalid date"){
          this.myDate = data.data.date;
        }else{
          this.myDate = this.myDate;
        }
        
      });
  }
}
