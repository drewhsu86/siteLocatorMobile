import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFailPage } from './login-fail.page';

const routes: Routes = [
  {
    path: '',
    component: LoginFailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginFailPageRoutingModule {}
