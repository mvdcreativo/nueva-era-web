import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { Router } from '@angular/router';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/admin/modules/brands/interfaces/brand';

@Component({
  selector: 'app-product-carousel-two',
  templateUrl: './product-carousel-two.component.html',
  styleUrls: ['./product-carousel-two.component.scss']
})
export class ProductCarouselTwoComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('brands') brands: Array<Brand> = [];

  public config: SwiperConfigInterface = {};

  urlFiles: string = environment.urlFiles;


  constructor(
    private cartService: CartService,
    private productsService: ProductService,
    private wishlistService: WishlistService,
    private router: Router
  ) { }
  //  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() {
    //  console.log(this.product);
  }
  ngAfterViewInit() {

    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 6,
        },


      }
    }
  }

 
}