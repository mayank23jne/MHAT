import { Component, OnInit } from '@angular/core';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent ,ActivatedRoute} from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-medicine-modal',
  templateUrl: './medicine-modal.page.html',
  styleUrls: ['./medicine-modal.page.scss'],
})
export class MedicineModalPage implements OnInit {
  modalTitle: string;
  modelId: number;
  baseURI :string = environment.app_url;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public alertController: AlertController,
    private router: Router, 
    private route: ActivatedRoute,
    public http : HttpClient, 
    public navCtrl: NavController, 
    public menuCtrl: MenuController, 
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    
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

  addMedicineForm(form){
    var formData: any = new FormData();
    formData.append("key", "create_medicine");
    formData.append("medicine_name", form.value.medicine_name);
    formData.append("unit_name", form.value.unit_name);
    this.http.post(this.baseURI+'manage-prescription.php',formData).subscribe((res : any) => {
      if(res['status'] == 1){
          this.toastMessage("Medicine added successfully.");
          this.modalController.dismiss(res['data']);
          //this.router.navigate(['/add-prescription/',this.modelId]);
        }if(res['status'] == 2){
          this.toastMessage("Medicine name already added.");
          this.closeModal();
        }if(res['status'] == 0){
          this.toastMessage("Something went wrong.");
          this.closeModal();
        }
          
      })
  }
}
