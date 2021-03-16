import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/seo/services/seo.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interfaces/user';

declare let fbq: Function;


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public config: SwiperConfigInterface = {};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  // @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product: Product;
  public products: Product[] = [];

  public image: any;
  public zoomImage: any;

  public counter: number = 1;
  urlFiles: string = environment.urlFiles;

  index: number;
  bigProductImageIndex = 0;
  user: User;

  constructor(
    private route: ActivatedRoute,
    public productsService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private seoService: SeoService,
    private authService: AuthService

    ) {
    this.user = this.authService.currentUserValue?.user
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.productsService.getProduct(slug).subscribe(
        res => {
          if(res?.status === "DIS"){
            this.router.navigate(["error"])
          }
        this.product = res
          this.setSeo(this.product)
          console.log(this.product)
        }
      )

    });
  }

  calculoDesc(price , descuentoProduct, dMayorista?){
    const descuentoP = (price * descuentoProduct) / 100;
    const pricePublico = price - descuentoP;
  
    if(dMayorista){
      const descuentMayorista = (pricePublico * dMayorista) / 100;
      return pricePublico - descuentMayorista;
    }
  
    return pricePublico
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

  setSeo(dataProduct) {
    //////seo/////
    // console.log(dataProduct);
    
    let t: string = dataProduct.name;

    this.seoService.genrateTags({

      title: `Nueva Era Uruguay | ${t}`,
      description: `Información del producto ${t}`,
      slug: `tienda/producto/${dataProduct.slug}`,
      brand: dataProduct.brand.name,
      category: dataProduct.category.name,
      image: this.urlFiles+dataProduct.picture,
      amount: dataProduct.price,
      currency: "UYU",
      availability:"in stock",
      retailer_item_id: dataProduct.id,


    })
    ////////////

  }


  ngOnInit() {

    this.productsService.getProducts().subscribe(product => this.products = product);


    this.getRelatedProducts();
  }


  ngAfterViewInit() {

  }


  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: { product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  getRelatedProducts() {
    this.productsService.getProducts()
      .subscribe(
        (product: Product[]) => {
          this.products = product
        });
  }

  // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }
  ////facebok pixel
  facebookAddToCart(product, quantity) {
    fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      value: product.price,   
      currency: 'UYU',
      content_type: 'product',
      contents: [{'id': product.id, 'quantity': quantity}]
    });
  }
  ////////
  // Add to cart
  public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product, parseInt(quantity));
    this.router.navigate(['/pages/checkout']);
    this.facebookAddToCart(product, quantity);
  }



  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      // zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    // this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }



}


