import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';
import { SeoService } from 'src/app/seo/services/seo.service';
import { CarouselService } from 'src/app/admin/modules/carousel/services/carousel.service';
import { CategoryService } from '../../shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/modules/categories/interfaces/category';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home-four',
  templateUrl: './home-four.component.html',
  styleUrls: ['./home-four.component.scss']
})
export class HomeFourComponent implements OnInit {
  public banners = [];
  // public currencies = ['USD', 'EUR'];
  // public currency:any;
  // public flags = [
  //   { name:'English', image: 'assets/images/flags/gb.svg' },
  //   { name:'German', image: 'assets/images/flags/de.svg' },
  //   { name:'French', image: 'assets/images/flags/fr.svg' },
  //   { name:'Russian', image: 'assets/images/flags/ru.svg' },
  //   { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  // ]
  // public flag:any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  wishlistItems: Product[] = [];
  slides: any;
  categories: Observable<Category[]>;

  // public slides = [
  //   { title: '', subtitle: '', image: 'assets/images/carousel/image.jpg' },
  //   { title: '', subtitle: '', image: 'assets/images/carousel/image2.jpg' },
  //   { title: '', subtitle: '', image: 'assets/images/carousel/image3.jpg' },
  //   { title: '', subtitle: '', image: 'assets/images/carousel/image4.jpg' },
  //   // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  // ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private seoService: SeoService,
    private carouselService: CarouselService,
    private categoryServices: CategoryService
  ) {

    this.setSeo()
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.carouselService.carouselActive().subscribe(
      res => this.slides = res.images
    )
  }

  ngOnInit() {



    this.productService.getBanners()
      .subscribe(

        data => this.banners = data
      );

    this.categories = this.categoryServices.categories()

        
    this.productService.getProducts()
      .subscribe(
        (product: Product[]) => {

          this.products = product.filter(
            x => x.category.id === 13 && x.status !== "DIS"

          )
          console.log(this.products);

        }
      )
    //  this.currency = this.currencies[0];
    //   this.flag = this.flags[0];


  }



  //////  funcion para Titulos
  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }
  ///////////////////////////////
  setSeo(dataProduct?) {
    //////seo/////
    // console.log(dataProduct);

    let t: string = "Inicio";

    this.seoService.genrateTags({

      title: `Nueva Era Uruguay | ${t}`,


    })
    ////////////
  }




  // public changeCurrency(currency){
  //   this.currency = currency;
  // }
  // public changeLang(flag){
  //   this.flag = flag;
  // }

}
