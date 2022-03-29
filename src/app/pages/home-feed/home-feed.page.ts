import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-home-feed',
  templateUrl: './home-feed.page.html',
  styleUrls: ['./home-feed.page.scss'],
})
export class HomeFeedPage implements OnInit {

  companyTitle = ''; // name will be pulled from user when used to sign up. 

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private companyService: CompanyService
    ) {
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  async getUser() {
    const loading = await this.loadingController.create();
    await loading.present();
    await console.log(this.userService.getUser(this.userService.currentUser.uid));
  }

}
