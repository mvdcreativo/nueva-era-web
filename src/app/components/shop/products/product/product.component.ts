import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { environment } from 'src/environments/environment';

declare let fbq:Function;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;

 urlImg: string = environment.urlImg;
 urlFiles: string = environment.urlFiles;
 
  constructor(
    private cartService: CartService, 
    public productsService: ProductService, 
    private wishlistService: WishlistService, 
    private dialog: MatDialog, 
    private router: Router ,
    
    ) { 

    }

  ngOnInit() {
  }

     // Add to cart
     public addToCart(product: Product,  quantity: number = 1) {
      this.cartService.addToCart(product,quantity);
      this.facebookAddToCart(product.name,product.id,product.price,product.category.name);
      console.log(product, quantity);
    }

    // Add to wishlist
    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    // Add to compare
    public addToCompare(product: Product) {
      this.productsService.addToCompare(product);
   }


  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }



  


  
  faceboockViewContent(name,id,price,category_name){
    fbq('track', 'ViewContent', {
      content_name: name,
      content_category: category_name,
      content_ids: [id],
      content_type: 'product',
      value: price,
      currency: 'UYU'
     });
  }

  facebookAddToCart(name,id,price,category_name){
    fbq('track', 'AddToCart', {
      content_name: name,
      content_category: category_name,
      content_ids: [id],
      content_type: 'product',
      value: price,
      currency: 'UYU'
     });
  }
}
