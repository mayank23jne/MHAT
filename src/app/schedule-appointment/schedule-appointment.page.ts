import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController  , ModalController} from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { Ionic4DatepickerModule , Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.page.html',
  styleUrls: ['./schedule-appointment.page.scss'],
})
export class ScheduleAppointmentPage implements OnInit {
  minDate: string = new Date().toISOString();
  today = new Date();
  maxDate: any =  new Date(this.today.getFullYear(),this.today.getMonth(), this.today.getDate()+42).toISOString();
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  patient_id: any = {};
  doctor_list: any = [];
  patient_name : any = {};
  myDate:string="";
  myTime:string="";
  myDateNTime:string;
  check_browser: string = "no";
  datePickerObj: any = {};
  selectedDate ;
  timePickerObj : any = {};
  selectedTime ;
  new_patient: any;
  booked_time: any = [];
  constructor(private platform : Platform, private datePicker: DatePicker,private router: Router,public alertController: AlertController, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController ,public modalCtrl: ModalController) {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      var self = this;
      document.addEventListener('deviceready', () => {
        self.check_browser = "yes";
      });
    } 
}

async confirmPopUp(msg,data) {
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
        text: 'Edit',
        handler: () => {
          this.router.navigate(['/reschedule-appointment',data.id]);
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
  //console.log(this.maxDate.toISOString());
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id =this.route.snapshot.params['id'];
        var formData1: any = new FormData();
        formData1.append("key", "get_patient_name_by_id_check_old_new");
        formData1.append("id", this.patient_id);
        this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
          if(res1!=''){
              //console.log(res);
              this.patient_name = res1.patient_name;
              this.new_patient = res1.check_patient;
              console.log(this.new_patient);
            }else{
              //console.log('hello');
              this.patient_name = '';
            }
              
          })
          // var formData: any = new FormData();
          // formData.append("key", "get_doctor_by_clinic_id");
          // formData.append("clinic_id", this.clinic_id);
          // this.http.post(this.baseURI+'manage-doctor.php',formData).subscribe((res) => {
          //   if(res != ''){
          //     this.doctor_list = res;   
          //   }
          // })
        
      }
  }
  patientAppointmentForm(form){
    // var date = new Date(form.value.date);
    // var time = new Date(form.value.time);
    // var day = ("0" + date.getDate()).slice(-2);  //Date of the month: 2 in our example
    // var month = ("0" + (date.getMonth() + 1)).slice(-2); //Month of the Year: 0-based index, so 1 in our example
    // var year = date.getFullYear();
    // var new_time = time.toLocaleTimeString('it-IT');
    // alert(new_time);
   
    // var new_date = year+'-'+month+'-'+day;
    // alert(year);
    //let patient_id =this.route.snapshot.params['id'];
    if((form.value.myDate_new !='') && (this.myTime !='')){
    var formData: any = new FormData();
    formData.append("key", "create_appointment");
    formData.append("patient_id", this.patient_id);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
    formData.append("doctor_id", 0);
    formData.append("send_to_clinic_id", 0);
    formData.append("date", form.value.myDate_new);
    formData.append("time", this.myTime);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
      if(res['status']==1){
        this.toastMessage("Appointment scheduled successfully.");
        window.history.back();
      }else if(res['status'] == 2){
        this.toastMessage("Time slot is not available.");
        window.history.back();
      }else if(res['status'] == 3){
        this.confirmPopUp("This patient already has an appointment in the future.Do you like to edit it?",res['data']);
      }else{
        this.toastMessage("Something went wrong.");
      }
    });
  }else{
    this.toastMessage("Date and time field is required.");
  }
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
  showDateTimepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates : false,
      is24Hour:false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      doneButtonLabel:"Save Date & Time",      
    }).then(
      dateTime => {
        this.myDateNTime = ("0" + dateTime.getDate()).slice(-2)+"-"+("0" + (dateTime.getMonth() + 1)).slice(-2)+"-"+dateTime.getFullYear()+" "+dateTime.toLocaleTimeString('it-IT');
      },
      err => console.log('Error occurred while getting dateTime: ', err)
    );
  }
  getDate(ev){
    var date1 = ev.target.value;
    var date = new Date(date1);
    this.myDate = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
  }
  getTime(ev){
    var date1 = ev.target.value;
    var date = new Date(date1);
    this.myTime = this.formatAMPM(date);
   // console.log(this.myTime);
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
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data.date != "Invalid date"){
          this.selectedDate = data.data.date;
        }else{
          this.selectedDate = this.selectedDate;
        }
        
      });
      
  }
  getScheduleTime(ev){
    var select_date = ev.target.value;
    if(select_date!=''){
      console.log('-',ev.target.value);
    var formData: any = new FormData();
    formData.append("key", "check_appointment_by_date");
    formData.append("date", select_date);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
    this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
      if(res!=''){
        console.log(res);
        this.booked_time = res;
      }else{
        this.booked_time = [];
      }
    })
    }
    
  }
}
