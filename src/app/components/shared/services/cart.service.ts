import { Injectable } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/modals/cart-item';
import { map, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interfaces/user';

declare let fbq: Function;

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Array
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;
  user: User;

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService

  ) {
    this.cartItems.subscribe(
      products => products = products
    );


  }

  // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

  // Add to cart
  public addToCart(product: Product, quantity: number) {
    this.authService.currentUser.pipe(take(1)).subscribe(
      res => {
        this.user = res?.user
      }
    )

    let message, status;
    var item: CartItem | boolean = false;
    // If Products exist
    let hasItem = products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]['discount_user'] = this.user?.discount || 0
          products[index]['discount_product'] = product?.discount
          products[index]['quantity'] = qty;
          message = 'El producto ' + product.name + ' se agrego tu carrito';
          status = 'success';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }
        return true;
      }
    });

    // If Products does not exist (Add New Products)
    if (!hasItem) {
      item = { product: product, quantity: quantity, discount_user: this.user?.discount  || 0, discount_product: product?.discount };
      products.push(item);
      message = 'El producto ' + product.name + ' se agrego tu carrito';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    ///ejecuta Pixel Facebook
    this.facebookAddToCart(product, quantity);

    localStorage.setItem("cartItem", JSON.stringify(products));
    return item;

  }

  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let message, status;
    let qty = product.quantity + quantity;
    let stock = product.product.stock;
    if (stock < qty) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      this.snackBar.open('No puedes agregar, sin stock. En stock ' + stock + ' artículos.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return false
    }
    return true
  }

  facebookAddToCart(product: Product, quantity) {

    // fbq('track', 'AddToCart', { 
    //   currency: 'UYU',
    //   content_ids: '150754082143164',
    //   content_type: 'product_group',
    // });
    fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      value: product.price,
      currency: 'UYU',
      content_type: 'product',
      contents: [{ 'id': product.id, 'quantity': quantity }]
      // content_category: product.category.name,
    });
  }



  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false;
    const index = products.indexOf(item);
    products.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(products));
  }

  // Total amount
  public getTotalAmount(): Observable<number> {
    this.authService.currentUser.pipe(take(1)).subscribe(
      res => {
        this.user = res?.user
      }
    )
    return this.cartItems.pipe(map((product: CartItem[]) => {
      return products.reduce((prev, curr: CartItem) => {
        return prev + this.calculoDesc(curr.product.price, curr.product?.discount, this.user?.discount) * curr.quantity;
      }, 0);
    }));
  }

  // Update Cart Value
  public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
    return products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock)
          products[index]['quantity'] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }


  ///calcula descuentos
  calculoDesc(price, descuentoProduct, dMayorista?) {
    const descuentoP = (price * descuentoProduct) / 100;
    const pricePublico = price - descuentoP;

    if (dMayorista) {
      const descuentMayorista = (pricePublico * dMayorista) / 100;
      return pricePublico - descuentMayorista;
    }

    return pricePublico
  }

}
