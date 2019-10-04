import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.page.html',
  styleUrls: ['./detail-pet.page.scss'],
})
export class DetailPetComponent implements OnInit {

  id;
  pet: any = {
    photoUrls: ["./assets/unknown_dog.png"],
    name: null,
    tags: null,
    status: "pending"
  };

  constructor(private api: APIService, private loadingController: LoadingController, private navCtrl: NavController, private activatedRoute: ActivatedRoute, public alertController: AlertController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading pet...'
    });
    try {
      await loading.present();
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.pet = await this.api.getPet(this.id);
      this.pet.tags = this.pet.tags.map(tag => tag.name).join(", ")
    } catch (error) {
      this.navCtrl.pop();
    } finally {
      await loading.dismiss();
    }
  }

  async alertDeletePet() {
    
    const alert = await this.alertController.create({
      header: 'Delete pet',
      subHeader: 'Are you sure that you want do this action?',
      buttons: [
        {
          text: 'No, please NO!',
          role: 'cancel'
        }, {
          text: 'Destroy it',
          handler: async () => {
            await this.deletePet();
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePet() {
    const loading = await this.loadingController.create({
      message: 'Deleting pet...'
    });
    try {
      await loading.present();
      await this.api.deletePet(this.id);
      this.navCtrl.pop();
    } catch (error) {
    } finally {
      await loading.dismiss();
    }
  }
}
