import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, MenuController , Platform, ModalController} from '@ionic/angular';
import { ToastController , IonRouterOutlet } from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { Ionic4DatepickerModalComponent  } from
    '@logisticinfotech/ionic4-datepicker';
import { flashOutline } from 'node_modules_1/ionicons/icons';
declare var $: any;
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.page.html',
  styleUrls: ['./patient-form.page.scss'],
})
export class PatientFormPage implements OnInit {
type: any;
btn_1 = "button_1";
btn_2 = "button_2";
btn_3 = "button_3";
btn_4 = "submit";
prefix = "";
patient_fname = "";
patient_mname = "";
patient_lname = "";
file_no = "";
phone = "";
external_id = "";
dob = "";
gender = "";
m_status = "";
age : any = "";
religions = "";
caste = "";
house_name = "";
place = "";
district = "";
child = "";
child_male:any;
child_female:any ;
child_other:any ;
sibling = "";
sibling_male = "";
sibling_female = "";
sibling_other = "";
education = "";
stay = "";
occupation = "";
toj = "";
patient_income = "";
other_e_member = "";
income_e_member = "";
diagnosis = "";
illness_duration = "";
onset_age = "";
mi_family = "";
relation_with_patient = "";
suicide_commited = "";
which_member = "";
suicide_type = "";
earlier_treatment = "";
treatment_source = "";
election_id = "";
aadhar_card = "";
ration_card = "";
home = "";
roof = "";
drinking_distance = "";
drinking_water_source = "";
toilet_facility = "";
gas_connection = "";
vehicle = "";
mobile_phone = "";
land_phone = "";
tv = "";
fridge = "";
food_kit = "";
financial_help = "";
kits_occasion = "";
pension = "";
pension_type = "";
health_care = "";
medicines = "";
baseURI :string = environment.app_url;
user_id: any = {};
clinic_id: any = {};
disability_certificate = "";
gender_array:any = []
prefix_array: string[];
  m_status_array: string[];
  cast_array: string[];
  yes_no_array: string[];
  stay_array: string[];
  patient_income_array: string[];
  earning_member_income_array: string[];
  suicide_type_array: any[];
  roof_array: any[];
  drinking_water_source_array: any[];
  religions_array: string[];
  district_array: string[];
  education_array: string[];
  occupation_array: any[];
  earning_member_array: any[] = [];
  relation_with_patient_array: any[];
  which_member_array: any[];
  home_array: string[];
  drinking_distance_array: string[];
  treatment_source_array: string[];
  datePickerObj: any = {};
  today = new Date();
  canGoBack: boolean = false;
  isDisabled: boolean=false;
  isSiblingDisabled: boolean=false;
  isTypeJobDisabled: boolean = false;
  isSuicideDisabled: boolean = false;
  isGovtDisabled: boolean = false;
  isTreatDisabled: boolean = false;
  earning_val: any;
  selectedArray :any = [];
  item_array: any[] = [] ;
  rl_w_patient: any;
  rl_with_p_other : any ="";
constructor(private routerOutlet: IonRouterOutlet,public modalCtrl: ModalController,private router: Router,public http : HttpClient, public navCtrl: NavController, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'DD-MM-YYYY',
      inputDate:("0" + this.today.getDate()).slice(-2)+"-"+("0" + (this.today.getMonth() + 1)).slice(-2)+"-"+this.today.getFullYear(), // default new Date()
      fromDate: new Date('1900-01-01'), // default null
      toDate: new Date(), // default null
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
    this.type = 'step-1';    
    var user_id = localStorage.getItem("user_id");
      if (user_id === null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.user_id = user_id;
        this.clinic_id = localStorage.getItem("clinic_id");
        this.gender_array = ["Male","Female","Other"];
        this.prefix_array = ["Mr.","Mrs.","Ms","Dr.","Master","Baby"];
        this.m_status_array = ["Married","Unmarried","Divorced","Widowed/Widower","Separated"];
        this.cast_array = ["SC","ST","OBC","Others","NA"];
        this.yes_no_array = ["Yes","No"];
        this.stay_array = ["Parents","Siblings","Spouse","Offspring","Relatives","Alone","Parents + Siblings","Parents + Spouse","Parents + Spouse + Offspring","Parents + Spouse + Siblings","Spouse + Offsprings"];
        this.patient_income_array = ["No income","Less than 1000","5000-10000","10000 and above"];
        this.earning_member_income_array = ["0-1000","1000-2000","2000-3000","3000-4000","4000-5000","5000 and Above"];
        this.suicide_type_array = ["NA","Poisoning","Hanging","Drowning","Fire","Others"];
        this.roof_array = ["Hut","Tile","Concrete","Sheet","Others"];
        this.drinking_water_source_array = ["Pipe Water in to the house","Pipe water to the yard or plot","Public tap","Bore Well","Well inside the plot","Community Well","Rain water collection","Vehicle water","Surface water","Own well","Public well","Pond","Public pipe water"];
        this.religions_array = ["Hindu","Muslim","Christain","Others"];
        this.district_array = ["Wayanad","Kozhikode","Malappuram","Palakkad","Alappuzha","Ernakulam","ldukki","Kannur","Kasaragod","Kollam","Kottayam","Pathanamthitta","Thiruvananthpuram","Thrissur"];
        this.education_array = ["Illiterate","Primary Education","SSLC","Higher Secondary","Graduation","Diploma","Post Graduation","Others"];
        this.occupation_array = ["Employed","Un-Employed"];
        //this.earning_member_array = ["Spouse","Offsprings","Parents","Siblings"];
        this.earning_member_array = [{
          member_names: "Spouse",
          value: '',
          checked:false
        },{
          member_names: "Offsprings",
          value: '',
          checked:false
        },{
          member_names: "Parents",
          value: '',
          checked:false
        },{
          member_names: "Siblings",
          value: '',
          checked:false
        }
      ];
        this.relation_with_patient_array = ["Paternal relations","Maternal relations","Paternal + Maternal relations","No mental illness","Other"];
        this.which_member_array = ["NA","Spouse","Offsprings","Paternal relations","Maternal relations","Paternal + Maternal relations","No mental illness"];
        this.home_array = ["Rented","Own"];
        this.drinking_distance_array = ["0-500m","500-1000m","1000-1500m","1500-2000m"];
        this.treatment_source_array = ["Govt Hospital/Clinic","Pvt Hospital/Clinic","Religious/Faith Healing"];

      }
    }
    ionViewWillEnter() {
      this.canGoBack = this.routerOutlet &&
      this.routerOutlet.canGoBack();
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
  patientForm(form){
    var btn_1 = form.value.btn_1;
    var btn_2 = form.value.btn_2;
    var btn_3 = form.value.btn_3;
    var btn_4 = form.value.btn_4;
    if(btn_1 == "button_1"){
      this.type = 'step-2';
      this.prefix = form.value.prefix;
      this.patient_fname = form.value.patient_fname;
      this.patient_mname = form.value.patient_mname;
      this.patient_lname = form.value.patient_lname;
      this.file_no = form.value.file_no;
      this.phone = form.value.phone;
      this.external_id = form.value.external_id;
      this.dob = form.value.dob;
      console.log(form.value.dob);
      // if(this.dob!=""){
      //   var d = new Date(this.dob);
      //   this.dob = (d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2));
      // }
      console.log(this.dob);
      this.gender = form.value.gender;
      this.m_status = form.value.m_status;
      this.age = this.age;
      this.religions = form.value.religions;
      this.caste = form.value.caste;
      this.house_name = this.house_name;
      this.place = this.place;
      this.district = form.value.district;
      console.log(this.age);
    }
    if(btn_2 == "button_2"){
      var passing = false;
      // if(this.earning_member_array.length ==0 ){
      //   this.toastMessage('Please check at least one checkbox.');
      // }else if(this.item_array.length > 0){
      //   var text = "";
      //   var i;
      //   var passing = false;
      //   for (i = 0; i < this.item_array.length; i++) {
      //     console.log(this.item_array[i].value);
      //     if (this.item_array[i].value!='') {
      //       passing =  true;
      //     }
      //   }
      //   if(passing == true){
      //     this.type = 'step-3';
      //   }else{
      //     this.toastMessage('Please fill respective text box.');
      //   }
        
      // }
      // if(this.checkValue(true, this.earning_member_array) == 'Not exist'){
      //   this.toastMessage('Please check at least one checkbox.');
      // }else
      //  if(this.checkValue(true, this.earning_member_array) == 'Exist'){
      //   if(this.checkValue2(true, this.earning_member_array) == 'Not exist'){
      //     this.toastMessage('Please fill respective text box.');
      //   }else{
      //     this.type = 'step-3';
      //   }
        
      // }
      this.type = 'step-3';
      this.child = form.value.child;
      if(form.value.child_male!=undefined){
        this.child_male = form.value.child_male;
      }else{
        this.child_male = "";
      }
      if(form.value.child_female!=undefined){
        this.child_female = form.value.child_female;
      }else{
        this.child_female = "";
      }

      if(form.value.child_other!=undefined){
        this.child_other = form.value.child_other;
      }else{
        this.child_other = "";
      }
      this.sibling = form.value.sibling;
      if(form.value.sibling_male!=undefined){
        this.sibling_male = form.value.sibling_male;
      }else{
        this.sibling_male = "";
      }
      if(form.value.sibling_female!=undefined){
        this.sibling_female = form.value.sibling_female;
      }else{
        this.sibling_female = "";
      }
      if(form.value.sibling_other!=undefined){
        this.sibling_other = form.value.sibling_other;
      }else{
        this.sibling_other = "";
      }
      
      this.education = form.value.education;
      this.stay = form.value.stay;
      this.occupation = form.value.occupation;
      if(form.value.toj!=undefined){
        this.toj = form.value.toj;
      }else{
        this.toj = "";
      }
      
      this.patient_income = form.value.patient_income;
      this.other_e_member = form.value.other_e_member;
      this.income_e_member = form.value.income_e_member;
      this.diagnosis = form.value.diagnosis;
      this.illness_duration = this.illness_duration;
      this.onset_age = this.onset_age;
    }
   
    if(btn_3 == "button_3"){
      //console.log("earning_member",this.item_array);
      this.type = 'step-4';
      this.mi_family = this.mi_family;
      this.relation_with_patient = form.value.relation_with_patient;
      this.suicide_commited = form.value.suicide_commited;
      if(form.value.which_member!=undefined){
        this.which_member = form.value.which_member;
      }else{
        this.which_member = "";
      }if(form.value.suicide_type!=undefined){
        this.suicide_type = form.value.suicide_type;
      }else{
        this.suicide_type = "";
      }     
      
      this.earlier_treatment = form.value.earlier_treatment;
      if(form.value.treatment_source!=undefined){
        this.treatment_source = form.value.treatment_source;
        this.treatment_source = this.treatment_source.toString();
        console.log(this.treatment_source);
      }else{
        this.treatment_source = "";
      }
      this.election_id = this.election_id;
      this.aadhar_card = this.aadhar_card;
      this.ration_card = this.ration_card;
      this.disability_certificate = this.disability_certificate;
      this.home = this.home;
      this.roof = this.roof;
      this.drinking_distance = this.drinking_distance;

    }
    if(btn_4 == "submit"){
      $("#submit_butn").prop('disabled', true);
      this.drinking_water_source = form.value.drinking_water_source ;
      this.toilet_facility = form.value.toilet_facility;
      this.gas_connection = form.value.gas_connection;
      this.vehicle = form.value.vehicle;
      this.mobile_phone = form.value.mobile_phone;
      this.land_phone = form.value.land_phone;
      this.tv = form.value.tv;
      this.fridge = form.value.fridge;
      this.food_kit = form.value.food_kit;
      this.financial_help = form.value.financial_help;
      this.kits_occasion = form.value.kits_occasion;
      this.pension = form.value.pension;
      if(form.value.pension_type!=undefined){
        this.pension_type = form.value.pension_type;
      }else{
        this.pension_type = "";
      }
      this.health_care = form.value.health_care;
      this.medicines = form.value.medicines;
      var formData: any = new FormData();
      formData.append("key", "create-new");
      formData.append("prefix", this.prefix);
      formData.append("patient_first_name", this.patient_fname);
      formData.append("patient_middle_name", this.patient_mname);
      formData.append("patient_last_name", this.patient_lname);
      formData.append("file_no", this.file_no);
      formData.append("phone", this.phone);
      formData.append("external_id", this.external_id);
      formData.append("dob", this.dob);
      formData.append("gender", this.gender);
      formData.append("m_status", this.m_status);
      formData.append("age", this.age);
      formData.append("religions", this.religions);
      formData.append("user_id", this.user_id);
      formData.append("caste", this.caste);
      formData.append("house_name", this.house_name);
      formData.append("place", this.place);
      formData.append("district", this.district);
      formData.append("child", this.child);
      formData.append("child_male", this.child_male);
      formData.append("child_female", this.child_female);
      formData.append("child_other", this.child_other);
      formData.append("sibling", this.sibling);
      formData.append("sibling_male", this.sibling_male);
      formData.append("sibling_female", this.sibling_female);
      formData.append("sibling_other", this.sibling_other);
      formData.append("education", this.education);
      formData.append("stay", this.stay);
      formData.append("occupation", this.occupation);
      formData.append("job_type", this.toj);
      formData.append("patient_income", this.patient_income);
      formData.append("other_earning_member", JSON.stringify(this.earning_member_array));
      formData.append("income_earning_member", this.income_e_member);
      formData.append("diagnosis", this.diagnosis);
      formData.append("illness_duration", this.illness_duration);
      formData.append("onset_age", this.onset_age);
      formData.append("mi_family", this.mi_family);
      formData.append("relation_with_patient", this.relation_with_patient);
      formData.append("patient_rl_other",this.rl_with_p_other);
      formData.append("suicide_commited", this.suicide_commited);
      formData.append("which_member", this.which_member);
      formData.append("suicide_type", this.suicide_type);
      formData.append("earlier_treatment", this.earlier_treatment);
      formData.append("treatment_source", this.treatment_source);
      formData.append("election_id", this.election_id);
      formData.append("aadhar_card", this.aadhar_card);
      formData.append("ration_card", this.ration_card);
      formData.append("home", this.home);
      formData.append("roof", this.roof);
      formData.append("disability_certificate", this.disability_certificate);
      formData.append("drinking_distance", this.drinking_distance);
      formData.append("drinking_water_source", this.drinking_water_source);
      formData.append("toilet_facility", this.toilet_facility);
      formData.append("gas_connection", this.gas_connection);
      formData.append("vehicle", this.vehicle);
      formData.append("mobile_phone", this.mobile_phone);
      formData.append("land_phone", this.land_phone);
      formData.append("tv", this.tv);
      formData.append("fridge", this.fridge);
      formData.append("food_kit", this.food_kit);
      formData.append("financial_help", this.financial_help);
      formData.append("kits_occasion", this.kits_occasion);
      formData.append("pension", this.pension);
      formData.append("pension_type", this.pension_type);
      formData.append("health_care", this.health_care);
      formData.append("medicines", this.medicines);
      formData.append("clinic_id", this.clinic_id);
      console.log(form);
      this.http.post(this.baseURI+'manage-patient.php',formData).subscribe((res : any) => {
        if(res['status'] == 1){
              $("#p_form")[0].reset();
              $("#submit_butn").prop('disabled', false);
               this.router.navigate(['/patient-list']);
               this.toastMessage('Patient added successfully.');
             }else{
              $("#submit_butn").prop('disabled', false);
               this.toastMessage('Something went wrong.');
             }  
                 
       })
    }
  }
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.dob 
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data!=undefined){
        if(data.data.date != "Invalid date"){
          this.dob = data.data.date;
        }
        }else{
          this.dob = this.dob;
        }
        var b = this.dob.split(/\D/);
        var dob = b.reverse().join('-');
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
          
            age--;
        }
        this.age = age;
      });
      
  } 
  private decrement (type) {
    if(type=='male'){
      if(this.child_male!=0){
        this.child_male--;
      }
    }if(type=='female'){
      if(this.child_female!=0){
        this.child_female--;
      }
    }
    
    
  }
  private increment (type) {
    if(type=='male'){
      this.child_male++;
    }if(type=='female'){
      this.child_female++;
    }
    
  }
  previous_stage(stage){
    this.type = stage;
  }
  childrenChange(ev){
    var value = ev.target.value;
    if(value=='No'){
      this.child_male = "";
      this.child_female = "";
      this.child_other = "";
      this.isDisabled = true;
    }else{
      this.isDisabled = false;
    }
  }
  siblingChange(ev){
    var value = ev.target.value;
    if(value=='No'){
      this.sibling_female = "";
      this.sibling_male = "";
      this.sibling_other = "";
      this.isSiblingDisabled = true;
    }else{
      this.isSiblingDisabled = false;
    }
  }
  occupationChange(ev){
    var value = ev.target.value;
      if(value=='Un-Employed'){
        this.toj = "";
        this.isTypeJobDisabled = true;
      }else{
        this.isTypeJobDisabled = false;
      }
    }
  suicideChange(ev){
    var value = ev.target.value;
      if(value=='No'){
        this.which_member = "";
        this.suicide_type = "";
        this.isSuicideDisabled = true;
      }else{
        this.isSuicideDisabled = false;
      }
  }
  changeGovt(ev){
    var value = ev.target.value;
      if(value=='No'){
        this.pension_type = "";
        this.isGovtDisabled = true;
      }else{
        this.isGovtDisabled = false;
      }
  }
  changeTreatment(ev){
    var value = ev.target.value;
      if(value=='No'){
        this.treatment_source = "";
        this.isTreatDisabled = true;
      }else{
        this.isTreatDisabled = false;
      }
  }
  getCheckBoxValue(ev,value){
    if(ev.detail.checked == true){
      var i;
      var check = false;

      this.earning_member_array.forEach(function(e){
       // console.log(e.member_names);
        if (e.member_names == value ){
          e["checked"] = true;
        }
      });

      // for (i = 0; i < this.earning_member_array.length; i++) {
      //   if(this.earning_member_array[i]['member_names'] == value){
      //     this.earning_member_array.push({"checked" : true
      //   });
      //   }
      // }
      
    }else{
      this.earning_member_array.forEach(function(e){
        if (e.member_names == value ){
          e["checked"] = false;
          e["value"] = "";
        }
      });
    }
    //this.earning_val = value;
    
  }
  // checkValue(value,arr){
  //   var status = 'Not exist';
  //   for(var i=0; i<arr.length; i++){
  //     var name = arr[i].checked;
  //     console.log("val",name);
  //     break;
  //     if(name == value){
  //       console.log("val",'yes')
  //       status = 'Exist';
  //       break;
  //     }
  //   }
  
  //   return status;
  // }
  checkValue2(value,arr){
    var status = 'Not exist';
    for(var i=0; i<arr.length; i++){
      var name = arr[i].checked;
      var name_text = arr[i].value;
      if(name == value && name_text != ''){
          status = 'Exist';
          break;
      }
    }
  
    return status;
  }
  getSelectedValue(ev){
    this.rl_w_patient = ev.target.value;
  }
  }

