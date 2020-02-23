import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeFourComponent } from '../shop/home-four/home-four.component';
import { ProductLeftSidebarComponent } from '../shop/products/product-left-sidebar/product-left-sidebar.component';
import { ProductDetailsComponent } from '../shop/products/product-details/product-details.component';
import { AccessComponent } from 'src/app/auth/access/access.component';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'inicio',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeFourComponent },
      { path: 'productos/marca/:marca', component: ProductLeftSidebarComponent },
      { path: 'productos/:category', component: ProductLeftSidebarComponent },
      { path: 'productos', component: ProductLeftSidebarComponent },
      { path: 'producto/:slug', component: ProductDetailsComponent },
      {
        path : 'acceder',
        component : AccessComponent
      },
      // {
      //   path:'auth',
      //   loadChildren:() => import('../../auth/auth.module').then(m => m.AuthModule),
      // },
      // {
      //   path: 'product',
      //   loadChildren: () => import('../shop/shop.module').then(m => m.ShopModule)
      // },
      {
        path: 'pages',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: '**',
        component: ErrorPageComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
