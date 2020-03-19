import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from "../../modals/product.model";
import { CartItem } from "../../modals/cart-item";
import { ProductService } from "../shared/services/product.service";
import { CartService } from "../shared/services/cart.service";
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../shared/sidebar/sidebar-menu.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { CategoryService } from '../shared/services/category.service';
import { map, filter } from 'rxjs/operators';

declare let fbq:Function;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidenavMenuItems: Array<any>;

  public flag: any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];

  public banners = [];

  wishlistItems: Product[] = [];

  public url: any;




  navItems: SidenavMenu[] 
  categorias: any;

  constructor(
    public router: Router, 
    private cartService: CartService, 
    public sidenavMenuService: SidebarMenuService,
    private categoryService : CategoryService,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
    ) {
      iconRegistry.addSvgIcon(
          'ico-wsp',
          sanitizer.bypassSecurityTrustResourceUrl('../assets/images/ico-wsp.svg')
      );
      
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    })
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    // this.currency = this.currencies[0];
    // this.flag = this.flags[0];
    this.categoryService.categorias$.subscribe(
      res => {
        this.navItems = res.map( 

          v => {
            console.log(v);
            let a = {displayName: v.name, iconName:"" , route: `/tienda/productos/${v.slug}`  }
            return a;
          }
          
        )

        
      }

    )


  }


  contactFacebook(){
    fbq('track', 'Contact');
  }
  // public changeCurrency(currency){
  //   this.currency = currency;
  // }
  // public changeLang(flag){
  //   this.flag = flag;
  // }
}
