import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from "@ionic-native/file/ngx";
import { environment } from '../../../environments/environment';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
  import {
    FileTransfer,
    FileTransferObject
   } from "@ionic-native/file-transfer/ngx";
   import { FileOpener } from "@ionic-native/file-opener/ngx";
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  modelId: number;
  notes:any = [];
  baseURI :string = environment.app_url;
  fileURI :string = environment.file_url;
  fileTransfer: FileTransferObject;
  constructor(public http : HttpClient,
     private modalController: ModalController,
     private navParams: NavParams,
     private fileOpener: FileOpener,
     private transfer: FileTransfer,
     private file: File
     ) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    var formData: any = new FormData();
    formData.append("key", "get_note_by_id");
    formData.append("id", this.modelId);
    this.http.post(this.baseURI+'manage-note.php',formData).subscribe((res : any) => {
      if(res!=""){
         this.notes = res;
         console.log(this.notes);
        } 
      })
  }
  async closeModal() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
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
