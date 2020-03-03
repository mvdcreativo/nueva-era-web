import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { PostsComponent } from '../../modules/posts/posts.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardService } from '../../modules/dashboard.service';
import { AuthModule } from 'src/app/auth/auth.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrandsComponent } from '../../modules/brands/brands.component';
import { MatInputModule } from '@angular/material/input';
import { repeat } from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from '../../modules/categories/categories.component';
import { AdminProductsComponent } from '../../modules/admin-products/admin-products.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { ScrollingModule } from '@angular/cdk/scrolling';
import { UsersComponent } from '../../modules/users/users.component';
import { UserComponent } from '../../modules/user/user.component';
// import { SharedModule } from 'src/app/components/shared/shared.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DialogFormComponent } from '../../modules/admin-products/dialog-form/dialog-form.component';
import { OrdersComponent } from '../../modules/orders/orders.component';
import { DialogFormOrderComponent } from '../../modules/orders/dialog-form-order/dialog-form-order.component';
 
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    BrandsComponent,
    CategoriesComponent,
    AdminProductsComponent,
    UsersComponent,
    UserComponent,
    DialogFormComponent,
    OrdersComponent,
    DialogFormOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    ScrollingModule,
    

    FlexLayoutModule,

    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class DefaultModule { }
