import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BtnWspRedirectComponent } from './components/shared/btn-wsp-redirect/btn-wsp-redirect.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';


const appRoutes: Routes = [

  {
    path: 'contacto/whatsapp',
    component: BtnWspRedirectComponent
  },

  {
    path: 'mi-cuenta',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: '',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
    // children: [
    //   // {
    //   //   path: 'admin',
    //   //   loadChildren: './admin/admin.module#AdminModule'
    //   // },
    //   {
    //     path: 'pages',
    //     loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
    //   },
    //   // {
    //   //   path: 'blog',
    //   //   loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
    //   // },

    // ]
  },


  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top'
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
