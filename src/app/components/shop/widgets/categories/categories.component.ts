import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/components/shared/services/category.service';
import { BrandService } from 'src/app/admin/modules/brands/services/brand.service';
import { Router } from '@angular/router';
import { Brand } from 'src/app/admin/modules/brands/interfaces/brand';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  brands: any;
  urlFiles = environment.urlFiles;

  constructor(
    private _categoryServices : CategoryService,
    private _brandServices: BrandService,
    public router : Router,

  ) { 

  }

  ngOnInit() {

    this.categories = this._categoryServices.categories()
    this._brandServices.getBrands().subscribe(
      (res:Brand[]) => {

        this.brands = res.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor)['id'] === indiceActual['id'])

      }


    )
  }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  navega(slug){
    this.router.navigate(['/productos/marca/', slug ])
  }

}
