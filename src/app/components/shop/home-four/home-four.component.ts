import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';



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
  wishlistItems  :   Product[] = [];


  public slides = [
    { title: 'Pagas en línea', subtitle: 'Aceptamos todas las tarjetas', image: 'assets/images/carousel/292945-P6WQQK-740.jpg' },
    { title: 'Envíos', subtitle: 'Sin costo a todo el País', image: 'assets/images/carousel/518693-PILN5U-159.jpg' },
    { title: 'Cuida a tu mascota', subtitle: 'Las marcas más prestigiosas', image: 'assets/images/carousel/518761-PILND3-941.jpg' },
    { title: 'Accesorios', subtitle: 'Recreación y confort para tu mascota', image: 'assets/images/carousel/3050639.jpg' },
    // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(
    private productService: ProductService, 
    private cartService: CartService
    ) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

  }

  ngOnInit() {
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );



 this.productService.getProducts()
 .subscribe(
   (product: Product[]) => {

     this.products = product.filter(
       x => x.category.id === 13

     )
   }
 )
//  this.currency = this.currencies[0];
//   this.flag = this.flags[0];


}





// public changeCurrency(currency){
//   this.currency = currency;
// }
// public changeLang(flag){
//   this.flag = flag;
// }

}
