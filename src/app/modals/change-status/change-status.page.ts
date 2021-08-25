import { Component, OnInit } from '@angular/core';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.page.html',
  styleUrls: ['./change-status.page.scss'],
})
export class ChangeStatusPage implements OnInit {
  modelId: any;
  StatusId: any;
  baseURI :string = environment.app_url;
  status_array: any[];

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private router: Router, 
    private route: ActivatedRoute,
    public http : HttpClient, 
    public toastController: ToastController) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    this.StatusId = this.navParams.data.paramStatus;
    this.status_array = ["Active","Deceased","Dropped Out",'Expired'];
  }
  async closeModal() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
   
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
    changeStatus(form){
      var formData: any = new FormData();
      formData.append("key", "change_patient_status");
      formData.append("status", form.value.status);
      formData.append("patient_id", this.modelId);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
            this.toastMessage("Status changed successfully.");
            this.closeModal();
            //this.router.navigate(['/add-prescription/',this.modelId]);
          }if(res['status'] == 0){
            this.toastMessage("Something went wrong.");
            this.closeModal();
          }
            
        })
    }
}
