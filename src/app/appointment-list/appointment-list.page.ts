import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController , ModalController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from "@ionic-native/file/ngx";
import { Router ,RouterEvent , ActivatedRoute} from '@angular/router';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { environment } from '../../environments/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.page.html',
  styleUrls: ['./appointment-list.page.scss'],
})
export class AppointmentListPage implements OnInit {

  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  appoint_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  currentDate: any;
  from_date: any="";
  today = new Date();
  to_date: any="";
  searchQuery: any = "";
  pdfObj: any;
  selectedArray :any = [];
  datePickerObj: any = {};
  selectedDate ;
  isWebApp: any;
  fileTransfer: FileTransferObject;
  s_name: any = "";
  page_number = 1;
  start : any = 50;
  start1: any;
  search_name: any = "";
  appoint_count: any;
  constructor(private transfer: FileTransfer,private platform: Platform,private fileOpener: FileOpener,public file: File,public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController,public modalCtrl: ModalController) {
    this.isWebApp = this.platform.url().startsWith('http');
   }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        if(this.clinic_id !=0){        
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
          this.clinic_name = res['name'];
        });
      }
      }
      this.datePickerObj = {
        dateFormat: 'YYYY-MM-DD',
        inputDate:this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default new Date()
        //fromDate: this.today.getFullYear()+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+("0" + this.today.getDate()).slice(-2), // default null
        toDate: new Date('2050-12-31'), // default null
        btnProperties:
        {
        expand : 'block',  // ???block??? | ???full???
        fill : 'solid',             // ???clear??? | ???default??? | ???outline??? | ???solid???
        size :'default',      // ???default??? | ???large??? | ???small???
        disabled :false,   // true | false
        strong :false,      // true | false
        color: '#a6ce39'  // ???primary??? | ???secondary??? | ???tertiary??? |
        // ???success??? | ???warning??? | ???danger??? | ???light??? | ???medium??? | ???dark???
        },
      };
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
    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          this.clinic_id = localStorage.getItem("clinic_id");
          //this.currentDate=new Date().toISOString().substr(0,10);
          
        }
        this.selectedAppointment();
    }
    selectedAppointment(){
      this.page_number = 1;
      this.start  = 50;
      this.searchQuery = "";
      var from_ = this.from_date.substring(0,10);
      var to_ = this.to_date.substring(0,10);
      var formData: any = new FormData();
      formData.append("key", "get_appointment_by_date_user_clinic_with_limit");
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      formData.append("from_date", from_);
      formData.append("to_date", to_);
      formData.append("start", 0);
      if(this.from_date!="" && this.to_date!=""){
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
        if(res['status'] == 1){
          this.appoint_list = res['data'];
          this.appoint_count = res['count'];
          this.error_m ="";      
          console.log(this.appoint_list.length > 0)    
        }else{
          this.appoint_list = [];
          this.appoint_count = res['count'];
          this.error_m = "Data not available";
          console.log(res);
        }
        
        
      });
    }
    }
    getData(isFirstLoad,event){
      this.page_number++;
       this.start1 = (this.page_number-1) * this.start; 
      let formData = new FormData();
      formData.append("key", "get_appointment_by_date_user_clinic_with_limit");
      formData.append('start', this.start1);
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      if(this.s_name!=''){
        formData.append("name", this.s_name);
      }
      if(this.from_date!="" && this.to_date!=""){
        var from_ = this.from_date.substring(0,10);
        var to_ = this.to_date.substring(0,10);
        formData.append("from_date", from_);
        formData.append("to_date", to_);
      }
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
          //this.service_list = res['data'];
          for (let i = 0; i < res['data'].length; i++) {
            this.appoint_list.push(res['data'][i]);
          }
          console.log(this.appoint_list);            
          //console.log(this.service_list)
          if (isFirstLoad)
            event.target.complete();
         
          //console.log(res['data'].length);
        }else{
          event.target.complete();
        }
        })
  
      
    }
    doInfinite(event) {
      this.getData(true,event);
    }
    async deleteAppointment(id) {
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
             this.deletePatientAppointment(id)
            }
          }
        ]
      });
  
      await alert.present();
    }
    searchByKeyword(event){
      this.page_number = 1;
      this.start  = 50;
      var from_ = this.from_date.substring(0,10);
      var to_ = this.to_date.substring(0,10);
      this.s_name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "get_appointment_by_date_user_clinic_with_limit");
      formData.append("name", this.s_name);
      formData.append("clinic_id", this.clinic_id);
      formData.append("user_id", this.user_id);
      formData.append("from_date", from_);
      formData.append("to_date", to_);
      if(this.from_date!="" && this.to_date!=""){
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.appoint_list = res['data'];
              this.appoint_count = res['count'];
              console.log(this.appoint_list.length > 0)
          }else{
            this.appoint_list = [];
            this.appoint_count = res['count'];
            this.error_m = "Data not available";
          }
        
      })
    }
    }
    deletePatientAppointment(id){
      var formData: any = new FormData();
      formData.append("key", "delete_appointment_by_patient");
      formData.append("id", id);
      this.http.post(this.baseURI+'manage-appointment.php',formData).subscribe((res) => {
        if(res['status']== 1){ 
          this.toastMessage("Patient appointment deleted successfully");
          this.selectedAppointment();
        }else{
          this.toastMessage("Something went wrong.");
        }       
        
     });

    }
    getBase64ImageFromURL(url) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = url;
      });
    }

    
    async makePdf() {
      var items = this.appoint_list;
    console.log(items);
      let self = this;
      pdfmake.vfs = pdfFonts.pdfMake.vfs;
      function buildTableBody(data) {
        var body = [];
       var test =  ['patient_id', 'patient_name','file_no','date','time'];
       var columns =  ['Patient Id', 'Patient Name','File NO','Appointment Date','Appointment Time'];
       body.push(columns);
    
        data.forEach(function(row) {
            var dataRow = [];
    
            test.forEach(function(column) {
                dataRow.push(row[column].toString());
            })
    
            body.push(dataRow);
        });
    
        return body;
    }
      function table(data) {
        return {
            table: {
                headerRows: 1,
                widths: [55, '*', '*','*','*'],
                body: buildTableBody(data)
            }
        };
    }
      var dd = {
        content: [
          {
            columns: [
            {
              image: await this.getBase64ImageFromURL(
                'assets/images/mhat_new_logo.png'
              ),
            fit: [100, 100]
            },
            [
            //{ text: 'MHAT', style: 'header' },
            //{ text: 'Cryptocurrency Payment System', style: 'sub_header' },
            ]
            ]
            },
            { text: 'List Of Patients Appointment - '+this.clinic_name, style: 'header' },
            
            table(items),
            
        ],
        
        
        
        styles: {
          header: {
          bold: true,
          fontSize: 16,
          alignment: 'center',
          margin: [0, 20, 0, 5]
          },
          table:{
            width:'500px'
          },
          sub_header: {
          fontSize: 18,
          alignment: 'right'
          },
          },
          pageSize: 'A4',
          pageOrientation: 'portrait'
          };
    
    
     // pdfmake.createPdf(dd).open();
      this.pdfObj = pdfmake.createPdf(dd);
      // pdfmake.createPdf(dd).getBuffer(function (buffer) {
      //   let utf8 = new Uint8Array(buffer);
      //   let binaryArray = utf8.buffer;
      //   self.saveToDevice(binaryArray,"Bitcoin.pdf")
      //   });
      this.downloadPdf();

      }
      downloadPdf() {
          this.pdfObj.download();       
          // this.pdfObj.getBuffer((buffer) => {
          //   var blob = new Blob([buffer], { type: 'application/pdf' });
     
          //   // Save the PDF to the data Directory of our App
          //   this.file.writeFile(this.file.dataDirectory, this.from_date+'-'+this.to_date+'('+this.clinic_name+')'+'.pdf', blob, { replace: true }).then(fileEntry => {
          //     // Open the PDf with the correct OS tools
          //     this.fileOpener.open(this.file.dataDirectory + this.from_date+'-'+this.to_date+'('+this.clinic_name+')'+'.pdf', 'application/pdf');
          //   })
          // });
        
      }
      saveToDevice(data:any,savefile:any){
        let self = this;
        self.file.writeFile(self.file.dataDirectory, savefile, data, {replace:true}).then((success) => {  
          this.toastMessage("File saved to your device");
        }).catch((err) => {  
          this.toastMessage("Error Occured While Writing File");  
        });
        
        }
        selectpatient(ev,id){
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

        sendToClinic(){
          
          var formData: any = new FormData();
          formData.append("clinic_id", this.clinic_id);
          formData.append("user_id", this.user_id);
          formData.append("appointment_id", this.selectedArray);
          this.http.post(this.baseURI+'pdf-generator.php',formData).subscribe((res) => {
            if(res['status']== 1){
              this.toastMessage("Appointment list successfully send to clinic.");
            }else{
              this.toastMessage("Something went wrong.");
            }
            
          });
        }
        async openDatePicker() {
          const datePickerModal = await this.modalCtrl.create({
            component: Ionic4DatepickerModalComponent,
            cssClass: 'li-ionic4-datePicker',
            componentProps: { 
               'objConfig': this.datePickerObj, 
               'selectedDate': this.from_date 
            }
          });
          await datePickerModal.present();
      
          datePickerModal.onDidDismiss()
            .then((data) => {
              console.log(data);
              if(data.data!=undefined){
              if(data.data.date != "Invalid date"){
                this.from_date = data.data.date;
              }
            }else{
                this.from_date = this.from_date;
              }
              
            });
        }  
        async openDatePicker2() {
          const datePickerModal = await this.modalCtrl.create({
            component: Ionic4DatepickerModalComponent,
            cssClass: 'li-ionic4-datePicker',
            componentProps: { 
               'objConfig': this.datePickerObj, 
               'selectedDate': this.to_date 
            }
          });
          await datePickerModal.present();
      
          datePickerModal.onDidDismiss()
            .then((data) => {
              console.log(data);
              if(data.data!=undefined){
              if(data.data.date != "Invalid date"){
                this.to_date = data.data.date;
              }
              }else{
                this.to_date = this.to_date;
              }
              
            });
        }   
 from_date_picker(){
    this.openDatePicker();
  }
  to_date_picker(){
    this.openDatePicker2();
  }
  makeDoc(){
    var from_ = this.from_date.substring(0,10);
    var to_ = this.to_date.substring(0,10);
    console.log(from_)
    var name = this.s_name;
    var formData: any = new FormData();
    //formData.append("key", "appointment_date_searchByName");
    formData.append("name", name);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
    formData.append("from_date", from_);
    formData.append("to_date", to_);
    if(this.from_date!="" && this.to_date!=""){
    this.http.post(this.baseURI+'test.php',formData).subscribe((res:any) => {
      if(res.status == 1){
        var file_name = res.file_name;
        window.open(this.baseURI+file_name, '_self');
        //this.download(file_name);
        setTimeout(() => {
          var formData: any = new FormData();
          formData.append("file_name", file_name);
          this.http.post(this.baseURI+'delete_doc_file.php',formData).subscribe((res:any) => {
                  
          })
        }, 10000);
       
      }
    });
  }
  }

  download(file_name){
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.baseURI+file_name, this.file.dataDirectory + file_name)
    .then(entry => {
      
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
}
