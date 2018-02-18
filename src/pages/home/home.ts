import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentDate = Date.now();
  lastDate = 0;

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('croqueEvents')
      .then(
        data => currentDate = data.lastTimestamp,
        error => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: "Can't read data: " + error,
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }

  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Eat Croque?',
      message: 'Srsly?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            let now = Date.now();
            this.nativeStorage.setItem('croqueEvents', {lastTimestamp: now})
              .then(
                () => this.lastDate = now,
                error => {
                  let alert = this.alertCtrl.create({
                    title: "Error",
                    subTitle: "Can't store data: " + error,
                    buttons: ['OK']
                  });
                  alert.present();
                }
              );
          }
        }
      ]
    });

    confirm.present()
  }

  doDebug() {
    this.nativeStorage.getItem('croqueEvents')
      .then(
        data => {
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: data.lastTimestamp,
            buttons: ['OK']
          });
          alert.present();
        },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: "Can't read data: " + error,
            buttons: ['OK']
          });
          alert.present();
        }
      );

  }


}
