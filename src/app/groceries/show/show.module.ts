import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPageRoutingModule } from './show-routing.module';

import { ShowPage } from './show.page';
import { IGroceryService, GroceryService } from '../grocery.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPageRoutingModule
  ],
  providers: [
    { provide: IGroceryService, useClass: GroceryService }
  ],
  declarations: [ShowPage]
})
export class ShowPageModule {}
