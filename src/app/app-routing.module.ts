import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./tabpages/discover/discover.module').then( m => m.DiscoverPageModule)
  },
  {
    path: 'saved',
    loadChildren: () => import('./tabpages/saved/saved.module').then( m => m.SavedPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./tabpages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'load-info',
    loadChildren: () => import('./pages/load-info/load-info.module').then( m => m.LoadInfoPageModule)
  },
  {
    path: 'login-fail',
    loadChildren: () => import('./pages/login-fail/login-fail.module').then( m => m.LoginFailPageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
