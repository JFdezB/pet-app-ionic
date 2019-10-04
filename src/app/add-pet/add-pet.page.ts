import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetComponent implements OnInit {
  
  pet = {
    img: "./assets/unknown_dog.png",
    name: null,
    tags: null,
    status: "pending"
  };

  photo: SafeResourceUrl;

  constructor(private api: APIService, private sanitizer: DomSanitizer, private loadingController: LoadingController, private navCtrl: NavController) { }

  public myPhoto: any;

  ngOnInit() { }

  async addPet() {
    const loading = await this.loadingController.create({
      message: 'Saving pet...'
    });
    try {
      await loading.present();
      this.pet.tags = this.pet.tags.split(',').filter(tag => tag.trim() !== "").map((tag, i) => {
        return {
          id: i,
          name: tag.trim()
        }
      })
      console.log(this.pet)
      let response = await this.api.postPet(this.pet);
      console.log(response)
      this.navCtrl.pop();
    } catch (error) {
      
    }finally{
      await loading.dismiss();
    }
    
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async selectPicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
}
