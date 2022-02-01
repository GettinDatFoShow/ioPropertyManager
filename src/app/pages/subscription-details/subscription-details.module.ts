import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionDetailsPageRoutingModule } from './subscription-details-routing.module';

import { SubscriptionDetailsPage } from './subscription-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionDetailsPageRoutingModule
  ],
  declarations: [SubscriptionDetailsPage]
})
export class SubscriptionDetailsPageModule {}
