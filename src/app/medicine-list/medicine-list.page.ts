import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MedicineModalPage } from '../modals/medicine-modal/medicine-modal.page';
import { UpdateMedicineModalPage } from '../modals/update-medicine-modal/update-medicine-modal.page';
import { Router , ActivatedRoute} from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.page.html',
  styleUrls: ['./medicine-list.page.scss'],
})
export class MedicineListPage implements OnInit {
  baseURI :string = environment.app_url;
  user_id: any = {};
  clinic_id: any = {};
  prescription: any = [];
  dataReturned: any;
  error_m : any ="";
  page_number = 1;
  start : any = 70;
  start1: any;
  search_name: any = "";
  constructor(public modalController: ModalController,public alertController: AlertController,private router: Router, private route: ActivatedRoute,public http : HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        
        }
    }
    ionViewWillEnter(){
      this.page_number = 1;
      this.start  = 70;
      this.search_name = "";
      var formData: any = new FormData();
      formData.append("key", "get_all_prescription_with_limit");
      formData.append("start", "0");
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
      if(res){
              this.prescription = res;
              this.error_m = "";
        }else{
          this.prescription = [];
          this.error_m = "Data not available";
        }
          
      })
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
     async exportToExcel(data, filename="medicine_list") {
      
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
    }
    searchByKeyword(event){
      this.page_number = 1;
      this.start  = 70;
      this.search_name = event.target.value;
      var formData: any = new FormData();
      formData.append("key", "get_all_prescription_with_limit");
      formData.append("name", this.search_name);
      formData.append("start", 0);
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res != ''){
           // this.router.navigate(['/patient-list']);
              this.error_m = "";
              this.prescription = res;
              //console.log(res);
          }else{
            this.prescription = [];
            //console.log("test");
            this.error_m = "Data not available";
          }
        
      })
    }
    getData(isFirstLoad,event){
      this.page_number++;
      this.start1 = (this.page_number-1) * this.start; 
      let formData = new FormData();
      formData.append("key", "get_all_prescription_with_limit");
      formData.append('start', this.start1);
      if(this.search_name!=''){
        formData.append('name', this.search_name);
      }
      this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
        if(res != ''){
          //this.service_list = res['data'];
          for (let i = 0; i < res.length; i++) {
            this.prescription.push(res[i]);
          }
          console.log(this.prescription);            
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
  async openModal() {
    const modal = await this.modalController.create({
      component: MedicineModalPage,
      cssClass: 'my-custom-modal',
      backdropDismiss:false,
      componentProps: {
        "paramID": '',
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== '') {
        this.dataReturned = dataReturned.data;
        console.log(this.dataReturned);
        this.prescription.push(this.dataReturned);
      }
    });

    return await modal.present();
  }

  async editModal(data) {
    const modal = await this.modalController.create({
      component: UpdateMedicineModalPage,
      cssClass: 'my-custom-modal',
      backdropDismiss:false,
      componentProps: {
        "edit_data": data,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== '') {
        this.dataReturned = dataReturned.data;
        console.log(this.dataReturned);
        this.prescription.push(this.dataReturned);
      }
    });

    return await modal.present();
  }
  async deletePrescription(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are your sure,you want to delete ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletePrescriptionData(id);
          }
        }
      ]
    });

    await alert.present();
  }
  deletePrescriptionData(id){
    let formData = new FormData();
    formData.append("key", "delete_prescription_by_id");
    formData.append('prescription_id', id);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
        this.toastMessage('Prescription deleted successfully.');
        this.ionViewWillEnter();
      }else{
        this.toastMessage('Something went wrong.');
      }
    })
  }
}
