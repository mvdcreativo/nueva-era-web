import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrandService } from 'src/app/admin/modules/brands/services/brand.service';
import { map, filter, take } from 'rxjs/operators';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  // brands: string[] = ['all', 'Lenovo', 'Dell', 'Dell', 'Lg', 'Samsung'];
  // brands: string[] = ['Dog Chow', 'Royal Canin', 'Equilibrio', 'Max', 'Pro Plan', 'Naturalis'];

  @Output() brandChanged = new EventEmitter();
  brands: any;
  constructor(
    private _brandService : BrandService
  ) { }

  ngOnInit() {
    this.getBrands()
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

  brendSelect(event) {
     
    this.brandChanged.emit(
      event.value
    );
  }

}
