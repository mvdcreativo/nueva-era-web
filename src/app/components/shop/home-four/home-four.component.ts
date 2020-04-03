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
    { title: '', subtitle: '', image: 'assets/images/carousel/en-casa.jpeg' },
    { title: '', subtitle: '', image: 'assets/images/carousel/envio-express.jpeg' },
    { title: '', subtitle: '', image: 'assets/images/carousel/envio.jpeg' },
    // { title: '', subtitle: '', image: 'assets/images/carousel/3050639.jpg' },
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
     console.log(this.products);
     
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
