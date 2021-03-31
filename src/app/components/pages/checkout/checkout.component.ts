import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/seo/services/seo.service';
declare let fbq: Function;

import { MatDialog } from '@angular/material/dialog';
import { DialogCompulsivaComponent } from './dialog-compulsiva/dialog-compulsiva.component';
import { Product } from 'src/app/modals/product.model';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  form: FormGroup;

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];

  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  user: User;
  productsCompulsiva: Product[];
  total: Observable<number>;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    public productService: ProductService,
    public orderService: OrdersService,
    private router: Router,
    private seoService: SeoService,
    public dialog: MatDialog
  ) {
    this.setSeo()
    this.createForm()
  }

  setSeo(dataProduct?) {
    //////seo/////
    // console.log(dataProduct);


    this.seoService.genrateTags({

      title: `Nueva Era Uruguay | Datos de pago y envío`,
      description: `Datos de pago y envío`,
      slug: `pages/checkout`,



    })
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();


    this.cartItems.subscribe(products => {
      this.buyProducts = products

    });
    
    this.user = this.authService.currentUserValue.user
    this.updateForm()

    this.productService.getProductByCategory('accesorios').subscribe(
      res =>{
        console.log(res);
        
        this.productsCompulsiva = res.products
      }

    );
    this.total = this.cartService.getTotalAmount();
  }

  createForm() {

    this.form = this.formBuilder.group({
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      ci: ['', Validators.required],
      company: [''],
      rut: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]

    })
    
  }

  updateForm(){
    this.form.setValue({
      user_id: this.user.id,
      name: this.user.name,
      lastname: this.user.lastname,
      ci: this.user.ci,
      company: this.user.company,
      rut: this.user.rut,
      address: this.user.address,
      city: this.user.city,
      state: this.user.state,
      email: this.user.email,
      phone: this.user.phone
    })

  }

  // productos = [
  //   {
  //     1:{quantity:"",price:""},
  //     11:
  //   }
  // ]

  


  onSubmit() {
    ///Facebook pixel
    fbq('track', 'AddPaymentInfo');
    //////

    if(this.user?.role === 'UMAY'){
      var dataProduct = this.buyProducts.map(
        value => {
          const a = { [value.product.id]: { quantity: value.quantity, price: value.product?.price_mayorista ? value.product?.price_mayorista : value.product?.price , discount_user: this.user.discount, discount_product: value.product?.discount} }
          return a
        }
      )
    }else{
      var dataProduct = this.buyProducts.map(
        value => {
          const a = { [value.product.id]: { quantity: value.quantity, price: value.product?.price , discount_user: this.user.discount, discount_product: value.product?.discount} }
          return a
        }
      )
      
    }

    let dataForm = this.form.value;
    this.total.subscribe(res=>dataForm.total = res),
    dataForm.products = dataProduct
    // console.log(dataForm);



    this.orderService.addOrder(dataForm).subscribe(
      (res: any) => {
        // localStorage.removeItem("cartItem");
        const id = res.id
        console.log(res);

        // >
        //redirecciono a url de pagos en API y a su vez redirecciona a mercadopago////
        if(this.user.role === "UMAY"){
          this.router.navigate(['/mi-cuenta/mis-pedidos'])
        }else{
          location.href = `${environment.urlPago}/${id}`
        }

        localStorage.removeItem('cartItem');
        // this.router.navigate(['/pages/metodos-de-pago/', id ])
        // console.log(res)
      }
    )
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogCompulsivaComponent, {
      width: '100%',
      maxWidth: '800px',
      data: this.productsCompulsiva
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === true){this.onSubmit()}
    });

  }

  getErrorMessages(field:string){
    let message;
    if(this.form.get(field).errors.required){
      message = "Campo requerido"
    }
    if(this.form.get(field).errors.email){
      message = "Email no es válido"
    }
    if(this.form.get(field).errors.pattern){
      message = "Ingresa solo números"
    }
    return message;
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
}
