import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { BrandsComponent } from './modules/brands/brands.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { AdminProductsComponent } from './modules/admin-products/admin-products.component';
import { AdministradorGuard } from '../auth/guards/administrador.guard';
import { UsersComponent } from './modules/users/users.component';
import { UserComponent } from './modules/user/user.component';



const appRoutes: Routes = [

  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categorias',
        component: CategoriesComponent,
        canActivate: [AdministradorGuard]
      },
      {
        path: 'marcas',
        component: BrandsComponent,
        canActivate: [AdministradorGuard]
      },
      {
        path: 'productos',
        component: AdminProductsComponent,
        canActivate: [AdministradorGuard]
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [AdministradorGuard]
      },
      {
        path: 'mis-datos',
        component: UserComponent,
      },
      
    ]
  },


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
