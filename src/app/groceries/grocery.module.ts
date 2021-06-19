import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IGroceryService, GroceryService } from './grocery.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    { provide: IGroceryService, useClass: GroceryService }
  ]
})
export class GroceryModule {}
