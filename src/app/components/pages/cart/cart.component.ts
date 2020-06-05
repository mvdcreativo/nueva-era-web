import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/seo/services/seo.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems : Observable<CartItem[]> = of([]);
  public shoppingCartItems  : CartItem[] = [];
  urlFiles: string = environment.urlFiles;


  constructor(
    private cartService: CartService,
    private seoService: SeoService
    ) { 
      this.setSeo()
    }

  setSeo(dataProduct?) {
    //////seo/////
    // console.log(dataProduct);
    

    this.seoService.genrateTags({

      title: `Nueva Era Uruguay | Carrito de compras`,
      description: `Carrito de compras`,
      slug: `pages/cart`,



    })
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

  }


    // Remove cart items
    public removeItem(item: CartItem) {
      this.cartService.removeFromCart(item);
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

}
