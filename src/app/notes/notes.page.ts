import { Component, OnInit } from '@angular/core';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, LoadingController, AlertController ,ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
const MEDIA_FILES_KEY = 'mediaFiles';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  baseURI :string = environment.app_url;
  audioPath:string;
  loadaudio:boolean = false;
  mediaFiles =[];
  uriPath:string;
  filesPath :string;
  filesName:string ='';
  loadphoto:boolean =false;
  loadfile:boolean = false;
  myphoto :any;
  notes:string="";
  name:string=''; 
  noteID:any;
  messages:Array<any> = [];
  currentDate:string;
  notestime:string;
  nlink:string = '';
  userID:any;
  patientID:any;
  audioName:string ='';
  clinic_id: string;
  patient_name: any;
  constructor(
            private storage:Storage,
            private mediaCapture:MediaCapture,
            private file: File,
            private camera: Camera,
            private fileChooser:FileChooser,
            private actionSheet: ActionSheet,
            private filePath: FilePath,
            private transfer: FileTransfer,
            private http:HttpClient,
            private alertCtrl:AlertController,
            private loadingCtrl:LoadingController,
            private router: Router,
            private route: ActivatedRoute,
            public toastController: ToastController
    ) { }

    ngOnInit() {
      var user_id = localStorage.getItem("user_id");
        if (this.userID === null) {
          this.router.navigate(['/sign-in']);
        } else {
          this.userID = user_id;
          this.clinic_id = localStorage.getItem("clinic_id");
          this.patientID =this.route.snapshot.params['id'];
          var formData1: any = new FormData();
          formData1.append("key", "get_patient_name_by_id_check_old_new");
          formData1.append("id", this.patientID);
          this.http.post(this.baseURI+'manage-patient.php',formData1).subscribe((res1 : any) => {
            if(res1!=''){
                //console.log(res);
                this.patient_name = res1.patient_name;
              }else{
                //console.log('hello');
                this.patient_name = '';
              }
                
            })
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
    
  captureaudio(){
    this.mediaCapture.captureAudio().then(res =>{
    this.storeMediaFiles(res);
  })
}
storeMediaFiles(files){
  console.log("store"+files);
  this.storage.get(MEDIA_FILES_KEY).then(res =>{
  if(res){
  let arr = JSON.parse(res);
  arr = arr.concat(files);
  this.storage.set(MEDIA_FILES_KEY,JSON.stringify(arr));
  }else{
    this.storage.set(MEDIA_FILES_KEY,JSON.stringify(files));
  }
  this.mediaFiles = this.mediaFiles.concat(files);
  this.audioPath = this.mediaFiles[0].fullPath;
  this.loadaudio = true;
  //alert(this.audioPath);
  this.toastMessage("Audio recorded successfully.");
  })
}
presentActionSheet() {
  try{

    const options: ActionSheetOptions = {
      title: 'What do you want with this image?',
      subtitle: 'Choose an action',
      buttonLabels: ['Take Photo', 'Get Photo from Library'],
      addCancelButtonWithLabel: 'Cancel',
      addDestructiveButtonWithLabel: 'Delete',
      //androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
      destructiveButtonLast: true
    }
    this.actionSheet.show(options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      if(buttonIndex == 1){
        this.loadphoto = true;
        this.takephoto();
      }
      if(buttonIndex == 2){
        this.loadphoto = true;
        this.getphoto();
      }
    });

  }catch(e){
   console.error(e);
  }
}
  getphoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,    
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    console.log('getphoto');
    this.camera.getPicture(options).then((imageData) => {
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     console.log(this.myphoto);
     this.toastMessage("Photo selected successfully.");
    }, (err) => {
      this.toastMessage("Something went wrong.");
    });
  }
  takephoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth:100,
	    sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
    
    console.log('takephoto');
    this.camera.getPicture(options).then((imageData) => {
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     console.log(this.myphoto);
     this.toastMessage("Photo selected successfully.");
    }, (err) => {
      this.toastMessage("Something went wrong.");
    });
  }

  choosefile(){
    this.fileChooser.open().then(uri => {
      this.uriPath = uri;
      this.filePath.resolveNativePath(uri).then(url => {
          console.log(url);
          /// url is path of selected file
          var fileName = url.substring(url.lastIndexOf("/") + 1);
          this.filesName = fileName;
          this.loadfile = true;
        })
        .catch(err => console.log(err));
    }
  )
  .catch(error => {
    console.log(error)
  });

  }

  submit(){ 
   if(this.notes!="") {
    if(this.loadphoto == true){
    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    this.name= options.fileName;
    console.log(this.myphoto); 
    fileTransfer.upload(this.myphoto, encodeURI(this.baseURI + "note-upload-2.php"), options)
      .then((data) => {
      this.myphoto = '';
      this.loadphoto = false;
      //this.toastMessage("Photo selected successfully.");
  
   }, (err :any) => {
        console.log(err);
       // this.toastMessage("Something went wrong.");
        
      });
    
    }

    if(this.loadfile == true){
      this.uploadresume();
    }

    if(this.loadaudio == true){
      this.uploadAudio();
      
    }

    if(this.notes != ''){

   this.messages.push(this.notes);
  
  }

  this.currentDate=new Date().toISOString().substr(0,10);
  var fulldate=new Date();
  var hours = fulldate.getHours(); 
  var mins = fulldate.getMinutes();
  if(hours > 12){
    hours = hours - 12;
    this.notestime = this.currentDate+''+hours+':'+mins+'PM';
  }else{
    this.notestime = this.currentDate+''+hours+':'+mins+'AM';
  }

  if(this.noteID == null){
  var formData: any = new FormData();
  formData.append("key", "create");
  formData.append("userID", this.userID);
  formData.append("imageName", this.name);
  formData.append("fileName", this.filesName);
  formData.append("audioName", this.audioName);
  formData.append("entryDate", this.currentDate);
  formData.append("entryTime", this.notestime);
  formData.append("nlink", this.nlink);
  formData.append("patientID", this.patientID);
  formData.append("description", this.notes);
  this.http.post(this.baseURI+'manage-note.php', formData,{responseType: 'text'})
 .subscribe((data : any) =>
 {// console.log(data);
  if(this.name !='' && this.name != null)
  {this.messages.push(this.name);}
  if(this.filesName !='' && this.filesName != null)
  {this.messages.push(this.filesName);}
  if(this.audioName !='' && this.audioName != null)
  {this.messages.push(this.audioName);} 
   this.notes = '';
   this.toastMessage("Note added successfully");
   window.history.back();
   }, 
  (error : any) =>
  {           
    this.toastMessage("Something went wrong.");
   });

 }
}else{
  this.toastMessage("Please enter description.");
}
  }
  uploadAudio(){
         const fileTransfer: FileTransferObject = this.transfer.create();

         var random = Math.floor(Math.random() * 1000);
         this.audioName = "myMp3_" + random + ".mp3";
    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
      let options1: FileUploadOptions = {
         fileKey: 'file',
         fileName: this.audioName,
         headers: {},
         httpMethod: 'post',
         params: {"app_key":"Testappkey"},
         chunkedMode : false
      
      }
      fileTransfer.upload(this.audioPath, encodeURI(this.baseURI + "note-upload.php"), options1)
      .then((data) => {  
       this.audioPath = '';
       this.loadaudio = false;
       //alert(JSON.stringify(data));
      }, (err) => {
       //alert("error"+JSON.stringify(err));
      });
    
   }

   uploadresume()
   {
      const fileTransfer: FileTransferObject = this.transfer.create();
 
 
     // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
       let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.filesName,
          headers: {},
          httpMethod: 'post',
          params: {"app_key":"Testappkey"},
          chunkedMode : false
       
       }
         fileTransfer.upload(this.uriPath, encodeURI(this.baseURI + "note-upload.php"), options1)
         .then((data) => {  
          this.uriPath = '';
          this.loadfile = false;
          
         }, (err) => {
          //alert("error"+JSON.stringify(err));
         });
   }
 

}
