import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {




  public sidenavOpen: boolean = true;
  public animation: any;   // Animation
  public sortByOrder: string = '';   // sorting
  public page: any;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public colorFilters: ColorFilter[] = [];

  public items: Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags: any[] = [];
  public colors: any[] = [];
  public seoData: any;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    ) {

  }

  ngOnInit() {
 

    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        
        if(Object.keys(params).length !== 0 ){
          console.log(params);

          this.seoData = {category: params.category, brand: params.marca || null}
          console.log(this.seoData);
          
          this.navegaConParametros(params);

        }else{
          ///Buscador
          this.navegaConQueryParams()
          console.log(params);
        }
      }
    )

  }



  navegaConParametros(params){

        
        if(params['marca']){
          const brands = params['marca'];
          this.brands(brands);
          
        }else{
          const category = params['category'];
          this.categories(category);
        }

      
 
  }

  navegaConQueryParams(){
    this.route.queryParamMap.subscribe(
      (params:Params) => {
        if(params){
          
          this.productService.searchProduct(params).subscribe(
            (res:any)=> {
              // console.log(res);
              this.products = res.filter(
                v => {
                  if(v.status !== "DIS" ){
                    return v;
                  }
                }
                )
              this.allItems = this.products
              this.products = this.products.slice(0.8)
            }
          )
          
        }else{
        }
      }
    )
  }

  categories(category){
    this.productService.getProductByCategory(category).subscribe(
      (products:any) => {
        this.products = products.products.filter(
          v => {
            if(v.status !== "DIS" ){
              return v;
            }
          }
          )
        this.allItems = this.products
        this.products = this.products.slice(0.8)

        // this.getTags(products)
        // this.getColors(products)
    })
  }

  brands(brands){
    this.productService.getProductByBrand(brands).subscribe(
      (products:any) => {

        this.products = products.products.filter(
          v => {
            if(v.status !== "DIS" ){
              return v;
            }
          }
          )
        this.allItems = this.products
        this.products = this.products.slice(0.8)

    })
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // // Initialize filetr Items
  // public filterItems(): Product[] {
  //   return this.items.filter((item: Product) => {
  //     const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
  //       if (item.colors) {
  //         if (item.colors.includes(curr.color)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
  //       if (item.tags) {
  //         if (item.tags.includes(curr)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     return Colors && Tags; // return true
  //   });

  // }

  public onPageChanged(event) {
    this.page = event;
    this.allItems;
    
  }


  // Update price filter
  //   public updatePriceFilters(price: any) {
  //     let items: any[] = [];
  //     this.products.filter((item: Product) => {
  //         if (item.price >= price[0] && item.price <= price[1] )  {
  //            items.push(item); // push in array
  //         }
  //     });
  //     this.items = items;
  // }


  // Update price filter
  // public updatePriceFilters(price: any) {
  //   // console.log(price);
  //   console.log(this.products);


  //   this.allItems = this.products.filter((item: Product) => {
  //     return item.price >= price.priceFrom && item.price <= price.priceTo
  //   });
  //   console.log(this.products);

  // }

  onBrendsChanged(newBrend) {
    console.log(newBrend);
    this.allItems = newBrend === 'all' ? this.products : this.products.filter(

      item => item.brand === newBrend
    )
    console.log(this.allItems);


  }
  
}
