import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from './menu/menu.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShoppingWidgetsComponent } from './shopping-widgets/shopping-widgets.component';
import { BannersFourComponent } from './banners-four/banners-four.component';
import { HeaderFourComponent } from './header-four/header-four.component';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CategoriesSectionComponent } from './categories-section/categories-section.component';
import { BtnWspRedirectComponent } from './btn-wsp-redirect/btn-wsp-redirect.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterOneComponent } from './footer-one/footer-one.component';



@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent,
    OrderByPipe,
    ShoppingWidgetsComponent,
    BannersFourComponent,
    HeaderFourComponent,
    CategoriesMenuComponent,
    CategoriesSectionComponent,
    BtnWspRedirectComponent,
    SnackBarComponent,
    FooterOneComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    OrderByPipe,
    MenuComponent,
    SidebarComponent,
    FlexLayoutModule,
    HeaderFourComponent,
    ShoppingWidgetsComponent,
    BannersFourComponent,
    CategoriesMenuComponent,
    CategoriesSectionComponent,
    BtnWspRedirectComponent,
    SnackBarComponent,
    MatPaginatorModule,
    FooterOneComponent
  ],
  providers: [
    ProductService,
    CartService
  ]
})
export class SharedModule {}
