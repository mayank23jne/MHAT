import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user_id: any = {};
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    var user_id = (localStorage.getItem("user_id"));
      if (user_id === null) {
        this.navCtrl.navigateBack("/sign-in");
      } else {
        this.user_id = user_id;
      }
    }
    ionViewDidEnter() {
      document.addEventListener("backbutton",function(e) {
        console.log("disable back button")
      }, false);
      var user_id = (localStorage.getItem("user_id"));
      if (user_id === null) {
        this.navCtrl.navigateBack("/sign-in");
      } else {
        this.user_id = user_id;
      }
    }

}
