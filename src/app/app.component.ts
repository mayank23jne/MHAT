import { Component, OnInit } from '@angular/core';
import { Platform , NavController} from '@ionic/angular';
import { Router ,RouterEvent} from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventService} from './service/event.service';
import { environment } from '../environments/environment';
import { Location } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { HomePage } from './home/home.page';
import { HttpClient } from '@angular/common/http';
declare var navigator: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages;
  public showLogout = true;
  email: any = {};
  profile_image: any = {};
  username: any = {};
  role: any = {};
  baseURI :string = environment.app_url;
  public icon = 'power';
  public backButtonSubscription: any;
  nativeStorage: any;
  rootPage: any;
  storage: any;
  private loggedIn: boolean = false;
  public notification_count;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private event : EventService,
    private location: Location,
    private router: Router,
    public navCtrl: NavController,
    private authGuardService: AuthGuardService,
    public http : HttpClient
  ) {
    this.initializeApp();
    // var self = this;
    // setInterval(function(){ 
    //   //this.vibrate();
    //   self.getProfileNotificationCount();
    // }, 1000);
    this.email = localStorage.getItem('email');
    this.profile_image = localStorage.getItem('profile_image') ;
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    if((localStorage.getItem('role'))=='volunteer'){
      this.getSideBar('volunteer');
    }
    else if((localStorage.getItem('role'))=='clinician'){
      this.getSideBar('clinician');
      
    }else if((localStorage.getItem('role'))=='doctor'){
      
      this.getSideBar('doctor');
    }
    else if((localStorage.getItem('role'))=='clinicadmin'){
      this.getSideBar('clinicadmin');
    }
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.overlaysWebView(false);
	  this.statusBar.styleLightContent();
	  this.statusBar.backgroundColorByHexString("#93b82e");
    this.splashScreen.hide();
    this.authGuardService.authState.subscribe(state => {
      if (state) {
        if((localStorage.getItem('role'))=='volunteer'){
          this.router.navigate(['/volunteer-patient']);
        }if((localStorage.getItem('role'))=='doctor'){
          this.router.navigate(['/doctor-patient-list']);
        }if((localStorage.getItem('role')=='clinician' || localStorage.getItem('role')=='clinicadmin')){
          this.router.navigate(['/todays-appointment']);
        }
        
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
    
    });
    
    /*Service For User Login*/
    this.event.subscribe('userprofile:created', (data) => {
      localStorage.setItem('email',data['email']);
      this.email = localStorage.getItem('email')
      this.username = data['username'];
      this.role = localStorage.getItem('role');
      localStorage.setItem('profile_image',data['profile_image']) ;
      this.profile_image = localStorage.getItem('profile_image') ;
    });
    this.event.subscribe('user:login', (data: any) => {
      console.log('hii'+(localStorage.getItem('role')));
      this.email = localStorage.getItem('email');
      this.username = localStorage.getItem('username');
      this.role = localStorage.getItem('role');
      this.profile_image = localStorage.getItem('profile_image') ;
     this.selectedIndex = 0;
    
    //this.showLogout = true;
        
    if((localStorage.getItem('role'))=='volunteer'){
      this.getSideBar('volunteer');
    }
    else if((localStorage.getItem('role'))=='clinician'){
      this.getSideBar('clinician');
      
    }else if((localStorage.getItem('role'))=='doctor'){
      
      this.getSideBar('doctor');
    }
    else if((localStorage.getItem('role'))=='clinicadmin'){
      this.getSideBar('clinicadmin');
    }
    
    //console.log('Welcome', data.user, 'at', data.time);
  });
  }


  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  ngAfterViewInit() {
    	
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // add logic here if you want to ask for a popup before exiting
      if (this.router.url === '/home') {
        //navigator.app.exitApp();
      }else if(this.router.url === '/sign-in'){
		  navigator.app.exitApp();
	  } else {
        this.location.back();
      }
    });
  }
  getProfileNotificationCount(){
    if(this.role == 'clinicadmin'){
      var formData: any = new FormData();
      formData.append("key", 'get_approval_notification_count');
      this.http.post(this.baseURI+'profile-approval-request.php',formData).subscribe((res) => {
      this.notification_count = res['notification_count'];
    });
    }
    
  }
  getSideBar(role){
    if(role =='volunteer'){
      this.appPages = [
        
        {
          title: 'Volunteer Appointment',
          url: 'volunteer-patient',
          icon: 'list'
        }, 
        {
          title: 'Send To Clinic Patient',
          url: 'volunteer-appointment-list',
          icon: 'list'
        }, 
        {
          title: 'Profile',
          url: 'profile',
          icon: 'person'
        },       
        {
          title: 'Follow Up Notes',
          url: 'notes-details',
          icon: 'list'
        },
      
        {
          title: 'Change Password',
          url: 'change-password',
          icon: 'key'
        }
        
        
      ];
    }
    else if(role =='clinician'){
      this.appPages = [
        {
          title: 'Home',
          url: 'todays-appointment',
          icon: 'home'
        },
        {
          title: 'Switch Clinic',
          url: 'switch-clinic',
          icon : 'toggle'
        },
        // {
        //   title: 'Notification',
        //   url: 'notification',
        //   icon : 'notifications'
        // },
        {
          title: 'Profile',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'New Patient',
          url: 'patient-form',
          icon: 'person'
        },
        {
          title: 'Patient list',
          url: 'patient-list',
          icon: 'document-text'
        },
        {
          title: 'Volunteer list',
          url: 'volunteer',
          icon: 'list'
        },
        {
          title: 'Assign Volunteer',
          url: 'assign-volunteer',
          icon: 'book'
        },
        // {
        //   title: 'Schedule Appointment',
        //   url: 'schedule-list',
        //   icon: 'newspaper'
        // },
        {
          title: 'Appointments',
          url: 'appointment-list',
          icon: 'list'
        },
        // {
        //   title: 'Todays List',
        //   url: 'todays-appointment',
        //   icon: 'list'
        // },
        {
          title: 'Follow Up Notes',
          url: 'notes-details',
          icon: 'list'
        },
        {
          title: 'Volunteer Appointment',
          url: 'volunteer-appointment',
          icon: 'newspaper'
        },
        {
          title: 'Demographic Info',
          url: '',
          icon: 'information-circle'
        },
        {
          title: 'Change Password',
          url: 'change-password',
          icon: 'key'
        }
        
        
      ];
      
    }else if(role =='doctor'){
      
      this.appPages = [
        {
          title: 'Home',
          url: 'doctor-patient-list',
          icon: 'home'
        },
        {
          title: 'Switch Clinic',
          url: 'switch-clinic',
          icon : 'toggle'
        },
        {
          title: 'Patient list',
          url: 'patient-list',
          icon: 'document-text'
        },
        {
          title: 'Profile',
          url: 'profile',
          icon: 'person'
        },       
        {
          title: 'Upload Signature',
          url: 'upload-signature',
          icon: 'document-text'
        },
        {
          title: 'Appointment Report',
          url: '/doctor-appointment-report',
          icon: 'list'
        },
        {
          title: 'Send list',
          url: 'sent-list',
          icon: 'send'
        },
        {
          title: 'Change Password',
          url: 'change-password',
          icon: 'key'
        }
        
        
      ];
    }
    else if(role =='clinicadmin'){
      this.appPages = [
        {
          title: 'Home',
          url: 'todays-appointment',
          icon: 'home'
        },
        {
          title: 'Notification',
          url: 'notification',
          icon: 'notifications'
        },
        {
          title: 'Profile',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Profile Update Log',
          url: 'profile-update-log',
          icon: 'person'
        },
        {
          title: 'New Patient',
          url: 'patient-form',
          icon: 'person'
        },
        {
          title: 'Clinics',
          url: 'clinics',
          icon: 'clipboard'
        },
        {
          title: 'Medicine',
          url: 'medicine-list',
          icon: 'medkit'
        },
        {
          title: 'Doctors',
          url: 'doctors',
          icon: 'medkit'
        },
        {
          title: 'Clinicians',
          url: 'clinicians',
          icon: 'clipboard'
        },
        {
          title: 'Assign Doctor To Clinic',
          url: 'assign-clinic',
          icon: 'medkit'
        },
        {
          title: 'Assign Doctor List',
          url: 'assign-doctor-list',
          icon: 'medkit'
        },
        {
          title: 'Assign Volunteer To Clinic',
          url: 'assign-volunteer-to-clinic',
          icon: 'list'
        },
        // {
        //   title: 'Assign Volunteer',
        //   url: 'assign-volunteer',
        //   icon: 'newspaper'
        // },
        {
          title: 'Patient list',
          url: 'patient-list',
          icon: 'list'
        },
        // {
        //   title: 'Schedule Appointment',
        //   url: 'schedule-list',
        //   icon: 'newspaper'
        // },
        {
          title: 'Appointments',
          url: 'appointment-list',
          icon: 'list'
        },
        // {
        //   title: 'Todays List',
        //   url: 'todays-appointment',
        //   icon: 'list'
        // },
        {
          title: 'Follow Up Notes',
          url: 'notes-details',
          icon: 'list'
        },
        {
          title: 'Volunteer list',
          url: 'volunteer',
          icon: 'list'
        },
        {
          title: 'Volunteer Appointment',
          url: 'volunteer-appointment',
          icon: 'newspaper'
        },
        {
          title: 'Clinician Report',
          url: 'clinician-report',
          icon: 'newspaper'
        },
        {
          title: 'Appointments Report',
          url: 'appointment-report',
          icon: 'newspaper'
        },
        {
          title: 'Clinician Wise Patient Report',
          url: 'clinician-wise-patient-list',
          icon: 'newspaper'
        },
        {
          title: 'Demographic Info',
          url: '',
          icon: 'information-circle'
        },
        
        {
          title: 'Change Password',
          url: 'change-password',
          icon: 'key'
        }
        
        
      ];
    }
  }
  logout(){
    this.authGuardService.logout();
    //this.router.navigate(['/sign-in']);
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  
}
