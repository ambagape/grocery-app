import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IGroceryService, GroceryService } from './grocery.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot()    
  ],
  providers: [
    { provide: IGroceryService, useClass: GroceryService }
  ]
})
export class GroceryModule {}
