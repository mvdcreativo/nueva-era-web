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
declare let fbq:Function;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  form: FormGroup;

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];

  amount: number;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  user: User;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    public productService: ProductService,
    public orderService: OrdersService,
    private router: Router,
    private seoService: SeoService
    ) { 
      this.setSeo()
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
    this.getTotal().subscribe(amount => this.amount = amount);
    this.user = this.authService.currentUserValue.user
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      user_id : [this.user.id, Validators.required],
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      ci: [this.user.ci, Validators.required],
      company: [this.user.company],
      rut: [this.user.rut],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required]
    })    



    

  }

  // productos = [
  //   {
  //     1:{quantity:"",price:""},
  //     11:
  //   }
  // ]

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  onSubmit() {
    ///Facebook pixel
    fbq('track', 'AddPaymentInfo');
    //////

    const dataProduct = this.buyProducts.map(
      value => {
        const a = {[value.product.id] : { quantity: value.quantity, price: value.product.price }}
        return a
      }
    )

    let dataForm = this.form.value
    dataForm.total = this.amount,
    dataForm.products = dataProduct
    console.log(dataForm);



    this.orderService.addOrder(dataForm).subscribe(      
      (res:any) => {
        // localStorage.removeItem("cartItem");
        const id = res.id
        console.log(res);
        
        //redirecciono a url de pagos en API y a su vez redirecciona a mercadopago////
        location.href= `${environment.urlPago}/${id}`

        localStorage.removeItem('cartItem');
        // this.router.navigate(['/pages/metodos-de-pago/', id ])
        // console.log(res)
      }
    )
      
    

  }

  


}
