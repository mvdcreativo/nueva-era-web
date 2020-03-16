import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/components/shared/services/category.service';
import { BrandService } from 'src/app/admin/modules/brands/services/brand.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { Brand } from 'src/app/admin/modules/brands/interfaces/brand';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  brands: any;

  constructor(
    private _categoryServices : CategoryService,
    private _brandServices: BrandService,
    public router : Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer

  ) { 
    this.matIconRegistry.addSvgIcon(
      "alimento-perro",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-perro.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "alimento-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-gato.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "sanitario-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-gato.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "antipulgas",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/anti-pulga.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "snacks",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/snack.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "accesorios",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-accesorios.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "promociones",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-promociones.svg")
    );
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
