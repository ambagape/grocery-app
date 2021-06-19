import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';
import { Base64 } from '@ionic-native/base64/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPage],
  providers: [Base64]
})
export class AddPageModule {}
