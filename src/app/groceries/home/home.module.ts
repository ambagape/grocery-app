import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { IGroceryService, GroceryService } from '../grocery.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [
    { provide: IGroceryService, useClass: GroceryService }
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
