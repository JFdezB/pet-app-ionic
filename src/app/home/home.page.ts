import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../api.service';
import { LoadingController, Platform, IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  activeRoute;

  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;
  constructor(private api: APIService, private router: Router, private loadingController: LoadingController, private platform: Platform) { }
  backButtonSubscription;

  pets: object;

  choices = "available"

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading pets...'
    });
    await loading.present();
    this.pets = await this.api.getPets(this.choices);
    await loading.dismiss();
  }

  async clickedReload() {
    this.pets = null;
    const loading = await this.loadingController.create({
      message: 'Loading pets...'
    });
    await loading.present();
    this.pets = await this.api.getPets(this.choices);
    await loading.dismiss();
  }

  async clickSettings(){
    await this.selectRef.open();
  }
}
