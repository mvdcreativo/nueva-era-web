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
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';

declare let fbq:Function;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public sidenavMenuItems: Array<any>;
  urlFiles = environment.urlFiles;
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
            let a = {displayName: v.name, iconName: `${this.urlFiles}images/icons-app/${v.slug}.svg` , route: `/tienda/productos/${v.slug}`  }
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
