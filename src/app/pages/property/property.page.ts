import { Component } from '@angular/core';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PopoverController } from '@ionic/angular';
import { Company, Property } from '../../global/models/globals.model';
import { CompanyService } from '../../services/company/company.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'iopm-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage {

  properties: Property[] = [];

  constructor(
    private popoverController: PopoverController, 
    private companyService: CompanyService,
    private userService: UserService
    ) {

  }

  ionViewWillEnter() {
    console.log('ION WILL ENTER');
    console.log(this.userService.currentUser)
    this.companyService.getCompany(this.userService.currentUser.companyId).subscribe((company: Company) => {
      console.log('getting company....');
      console.log(company);
      if (!!company.properties){
        this.properties = company.properties;
      }
    })
  }
  
  async addProperty(ev: any) {
    const popover = await this.popoverController.create({
      component: AddPropertyComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
