import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
// Import the library
// import { NgxImageZoomModule } from 'ngx-image-zoom';

// import { ProductCarouselTwoComponent } from './home-two/product-carousel-two/product-carousel-two.component';
import { ProductCarouselThreeComponent } from './home-three/product-carousel-three/product-carousel-three.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { BrandsComponent } from './widgets/brands/brands.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';


@NgModule({
  declarations: [
    MainCarouselComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProductLeftSidebarComponent,


    // ProductCarouselTwoComponent,
    ProductCarouselThreeComponent,
    CategoriesComponent,
    BrandsComponent,
    PopularProductsComponent,
    HomeFourComponent,
    ProductZoomComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    ShopRoutingModule,
    
      // NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    ProductDialogComponent,
    ProductZoomComponent,
    HomeFourComponent

  ],

  // entryComponents:[
  //   ProductDialogComponent,
  //   ProductZoomComponent
  // ],
})

export class ShopModule{ }
