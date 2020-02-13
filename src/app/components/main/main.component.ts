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

  navItems: SidenavMenu[] = [
    {
      displayName: 'Inicio',
      iconName: 'home',
      route: '/'
    },
    {
      displayName: 'Perros',
      iconName: '',
      route: 'productos/1'
    },
    {
      displayName: 'Gatos',
      iconName: '',
      route: 'productos/2'
    },
    {
      displayName: 'Accesorios',
      iconName: '',
      route: 'productos/3'
    },
    {
      displayName: 'Promociones',
      iconName: '',
      route: 'productos/4'
    },
    {
      displayName: 'Contacto',
      iconName: '',
      route: '#'
    }
  ];

  constructor(
    public router: Router, 
    private cartService: CartService, 
    public sidenavMenuService: SidebarMenuService,
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

  }

  // public changeCurrency(currency){
  //   this.currency = currency;
  // }
  // public changeLang(flag){
  //   this.flag = flag;
  // }
}
