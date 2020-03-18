import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {
  public formSearch: FormGroup;
  
  products: Product[];
  indexProduct: number;
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];
  constructor(
    private cartService: CartService,
    private _fb : FormBuilder,
    private _productService : ProductService,
    private router : Router
    ) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
   }

  ngOnInit() {
    this.formSearch = this._fb.group({
      buscando: [null, [Validators.required]]
    });
  }

  onSubmit(){
    const data = this.formSearch.value
    console.log(data);
    
    this.router.navigate(['/tienda/productos'], { queryParams: data });


  }

}
