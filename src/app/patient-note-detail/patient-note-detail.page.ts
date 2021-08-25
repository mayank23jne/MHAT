import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileTransferObject
 } from "@ionic-native/file-transfer/ngx";
 import { FileOpener } from "@ionic-native/file-opener/ngx";
@Component({
  selector: 'app-patient-note-detail',
  templateUrl: './patient-note-detail.page.html',
  styleUrls: ['./patient-note-detail.page.scss'],
})
export class PatientNoteDetailPage implements OnInit {
  baseURI :string = environment.app_url;
  fileURI :string = environment.file_url;
  user_id: any = {};
  clinic_id: any = {};
  clinic_name: any = {};
  patient_id: any = {};
  note_list: any = [];
  error_m: any ;
  fileTransfer: FileTransferObject;
  role: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public http : HttpClient,
              private fileOpener: FileOpener,
              private transfer: FileTransfer,
              private file: File
              ) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.role = localStorage.getItem("role");
        var formData: any = new FormData();
        formData.append("clinic_id", this.clinic_id);
        this.http.post(this.baseURI+'retrive_clinic.php',formData).subscribe((res) => {
        this.clinic_name = res['name'];
        });
      }
  }
  ionViewDidEnter() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.patient_id = this.route.snapshot.params['id'];
        var formData: any = new FormData();
        formData.append("key", "get_note_by_patient");
        formData.append("patient_id", this.patient_id);
        this.http.post(this.baseURI+'manage-note.php',formData).subscribe((res) => {
          if(res != ''){
            this.error_m = "";
            this.note_list = res;
            console.log(res);            
          }else{
            this.note_list =[];
            this.error_m = "Note data not available";
            //console.log(res);
          }
          
          
       });
      }
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
    console.log("download complete: " + entry.toURL());
    let fileExtn=file_name.split('.').reverse()[0];
    let fileMIMEType=this.getMIMEtype(fileExtn);
         this.fileOpener.open(entry.toURL()+"", fileMIMEType)
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
    // this.fileOpener
    // .open(entry.toURL(), "application/pdf")
    // .then(() => console.log("File is opened"))
    // .catch(e => console.log("Error opening file", e));
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
