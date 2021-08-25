import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { File } from "@ionic-native/file/ngx";
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { environment } from '../../environments/environment';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-clinician-wise-patient-list',
  templateUrl: './clinician-wise-patient-list.page.html',
  styleUrls: ['./clinician-wise-patient-list.page.scss'],
})
export class ClinicianWisePatientListPage implements OnInit {
  baseURI :string = environment.app_url;
  profileURI :string = environment.profile_url;
  user_id: any = {};
  clinic_id: any = {};
  loading: any;
  clinician_list: any = [];
  clinic_name: any = {};
  error_m: any ;
  patient_list: any = [];
  pdfObj: any;
  page_number = 1;
  start : any = 10;
  start1: any;
  search_name: any = "";
  clinician_id: any = "";
  constructor(private platform: Platform,private fileOpener: FileOpener,public file: File,private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) {
   
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
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
      }
    }
    ionViewDidEnter() {
      var user_id = localStorage.getItem("user_id");
        if (user_id === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.user_id = user_id;
          this.clinic_id = localStorage.getItem("clinic_id");
          var formData: any = new FormData();
          formData.append("key", "get_patient_by_clinic_with_limit");
          formData.append("clinic_id", this.clinic_id);
          formData.append("user_id", this.user_id);
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.patient_list = res;
              console.log(res);            
            }else{
              this.patient_list =[];
              this.error_m = "Patient data not available";
              //console.log(res);
            }
        });
         var formData2: any = new FormData();
          formData2.append("key", "get_clinician_all");
          this.http.post(this.baseURI+'manage-clinician.php',formData2).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.clinician_list = res;           
            }else{
              this.clinician_list = [];
            }
            
            
         });
        }
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
    buildTableBody(data) {
      var body = [];


      var test =  ['SR_No', 'file_no', 'name', 'status', 'EntryDate','clinician'];
      var columns =  ['Sr No', 'File No','Name','Status' , 'Entry Date' , 'Clinician'];
      body.push(columns);
       data.forEach(function(row) {
           var dataRow = [];
   
           test.forEach(function(column) {
            dataRow.push(row[column]);
               //dataRow.push(row[column].toString());
           })
   
           body.push(dataRow);
       });
  
      return body;
  }
    table(data) {
      return {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto','auto','auto','auto'],
          body:this.buildTableBody(data)
          
        }
      };
    }
  
  async generateReport(){
  var tempObj = {}
  var tempArr = [];
  for(var i=0; i<this.patient_list.length; i++){
  
     tempArr.push(
       { 
         SR_No: i+1, 
         file_no: this.patient_list[i].file_no,
         name: this.patient_list[i].name+' '+this.patient_list[i].patient_middle_name+' '+this.patient_list[i].patient_last_name,
         status: this.patient_list[i].patient_status,
         EntryDate: this.patient_list[i].entryDate,
         clinician: this.patient_list[i].full_name+' ('+this.patient_list[i].username+')',
        }
    );
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
                ]
                },
                { text: 'Clinician Wise Patient Report', style: 'header' },
              this.table(tempArr)
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
  }
  this.pdfObj = pdfmake.createPdf(dd);
  this.downloadPdf();
  }

  downloadPdf() {
    
    this.pdfObj.download();
    
    // this.pdfObj.getBuffer((buffer) => {
    //     var blob = new Blob([buffer], { type: 'application/pdf' });
 
    //     // Save the PDF to the data Directory of our App
    //     this.file.writeFile(this.file.dataDirectory, 'clinician_patient_report.pdf', blob, { replace: true }).then(fileEntry => {
    //       // Open the PDf with the correct OS tools
    //       this.fileOpener.open(this.file.dataDirectory + 'clinician_patient_report.pdf', 'application/pdf');
    //     })
    //   });
      
     
     
      // On a browser simply use download!          
      
    
  }

  selectClinician(ev){
    this.page_number = 1;
      this.start  = 10;
      this.clinician_id = ev.target.value;
          var formData: any = new FormData();
          formData.append("key", "get_patient_by_clinic_with_limit");
          formData.append("clinic_id", this.clinic_id);
          formData.append("user_id", this.user_id);
          formData.append("clinician_id", this.clinician_id);
          formData.append("start", 0);
          this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res) => {
            if(res != ''){
              this.error_m = "";
              this.patient_list = res;    
            }else{
              this.patient_list =[];
              this.error_m = "Patient data not available";
              //console.log(res);
            }
        });
    
  }
  getData(isFirstLoad,event){
    console.log(this.clinician_id);
    this.page_number++;
     this.start1 = (this.page_number-1) * this.start; 
    let formData = new FormData();
    formData.append("key", "get_patient_by_clinic_with_limit");
    formData.append('start', this.start1);
    formData.append("clinic_id", this.clinic_id);
    formData.append("user_id", this.user_id);
     if(this.clinician_id!=''){
       formData.append('clinician_id', this.clinician_id);
     }
    this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
      if(res != ''){
        //this.service_list = res['data'];
        for (let i = 0; i < res.length; i++) {
          this.patient_list.push(res[i]);
        }
        //console.log(this.patient_list);            
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
}
