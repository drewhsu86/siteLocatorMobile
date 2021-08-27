import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFailPageRoutingModule } from './login-fail-routing.module';

import { LoginFailPage } from './login-fail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFailPageRoutingModule
  ],
  declarations: [LoginFailPage]
})
export class LoginFailPageModule {}
