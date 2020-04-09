import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/seo/services/seo.service';
import { Seo } from 'src/app/seo/interfaces/seo';

declare let fbq: Function;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input() product: Product;
  @Input() seo: Seo;


  urlImg: string = environment.urlImg;
  urlFiles: string = environment.urlFiles;

  constructor(
    private cartService: CartService,
    public productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router,
    private seoService: SeoService

  ) {

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


  
  ngOnInit() {

    let t: string = this.titleCase(`${this.seo.category} ${this.seo.brand || ""}`.replace(/-/gi, " "));
    var slug;
    if (this.seo.brand) {
      slug = this.seo.category + '/' + this.seo.brand;
    } else {
      slug = this.seo.category
    }
    this.seoService.genrateTags({
      title: `Nueva Era Uruguay | ${t}`,
      description: `Listado de los productos de ${this.seo.category} ${this.seo.brand || ""}`,
      slug: `tienda/productos/${slug}`,

      brand: `${this.titleCase(this.seo.brand.replace(/-/gi, " ")) || ""}`,
      category: `${this.titleCase(this.seo.category.replace(/-/gi, " ")) || ""}`,
    })


  }

  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {

    this.cartService.addToCart(product, quantity);
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


  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }







  faceboockViewContent(product) {
    fbq('track', 'ViewContent', {
      content_name: product.name,
      content_ids: product.id,
      content_type: 'product_group',
      value: product.price,
      currency: 'UYU'
    });
  }



}
