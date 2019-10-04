import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  backButtonSubscription;
  activeRoute;
  previousRoute;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousRoute = this.activeRoute + '';
        this.activeRoute = event.url;
      }
      // const toast = await this.toastController.create({
      //   message: "Ejecutando - " + this.activeRoute + " - " + this.previousRoute,
      //   duration: 2000
      // });
      // toast.present();
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      if ((this.previousRoute.trim() != "/home" || this.previousRoute != "/") && (this.activeRoute.trim() == "/home" || this.activeRoute == "/"))
        navigator['app'].exitApp();
      else
        navigator['app'].pop();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
