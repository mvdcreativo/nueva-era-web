import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/modals/product.model';
import { BrandService } from 'src/app/admin/modules/brands/services/brand.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {
  form: FormGroup;
  products: Product[];
  brands: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private _brandService: BrandService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required, Validators.minLength(3)]]
    })

    this.getBrands();


  }


  onSubmit() {
    this.messageService.sendMessage(this.form.value)
    this.form.reset();
  }



  getBrands(){
    this._brandService.getBrands()
    .pipe(take(1))
    .subscribe(
      (res:any) => {
        this.brands = res.filter(x => x.destaca === 1)
      }
    )
     
  }
}