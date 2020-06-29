import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarouselService } from './services/carousel.service';
import { Carousel, ImagesSlide } from './interfaces/carousel';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import PlatformOptions from "./platform-options.json";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

})
export class CarouselComponent implements OnInit {
  status = [
    {name: "Activo", value: true},
    {name: "Inactivo", value: false}
  ]

  platformOptions : any = PlatformOptions;

  btnSiguiente = true;
  btnGuardar = !this.btnSiguiente

  displayedColumns: string[] = ['id', 'name', 'images', 'platform', 'status', 'acciones' ];
  dataSource: any;
  form : FormGroup
  carousels: Carousel[];
  
  expandedElement: Carousel | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  images: ImagesSlide[];
  carousel: Carousel = null;
  add: boolean= false;
  dataImgOrdenado: void[];
  edit: boolean = false;
  readOnlyPlatform: boolean = false;


  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private carouselService: CarouselService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      platform: ["WEB", Validators.required],
      status: [null]
    })
    this.getCarousels()
  }

  getCarousels(){
    this.carouselService.getCarousels().subscribe(
      res=>{
        this.carousels = res
        this.carousels.sort((a, b) => {
          return (b.id - a.id)
        })
        this.carousels.map( 
          a => {
            a.images.sort((b, c) => {
              return (b.position - c.position);
            })
          }
        )
        this.dataSource = new MatTableDataSource(this.carousels);
        this.dataSource.paginator = this.paginator;
      }
    );
  }


  onSubmit(){
    this.carouselService.addCarousel(this.form.value)
    this.btnSiguiente = false
    this.btnGuardar = true
    this.carouselService.carousel.subscribe(
      res => this.carousel= res
    )

  }
  openAdd(){
    this.add = !this.add;
    this.btnSiguiente = true;
    this.btnGuardar = false;

  }
 guardar(){
    this.update()
    
    this.carouselService.setCarousel(null)
    this.form.reset();
    this.form.setValue(
      {
        name:null,
        platform:"WEB",
        status: null
      }
    )
    this.form.get('platform').enable()
    this.getCarousels()
    this.openAdd()
  }
  cancelar(){
    if(this.carousel){
      this.carouselService.deleteCarousel(this.carousel.id).subscribe(
        res=> {
          this.carouselService.setCarousel(null)
          this.form.reset();
          this.form.setValue(
            {
              name:null,
              platform:"WEB",
              status: null
            }
          )
          this.openAdd()
        }
      )
    }else{
      this.form.reset();
      this.form.setValue(
        {
          name:null,
          platform:"WEB",
          status: null
        }
      )
      this.openAdd()
    }
  }

  activar(element){
    const data = {status: 1}
    this.carouselService.updateCarousel(element.id,data ).subscribe(
          res => this.getCarousels()
          
    )
    
  }

  deleteReg(id){
    this.carouselService.deleteCarousel(id).subscribe(
      res => {
        this.getCarousels()
      }
      
    )
  }



  openEdit(element: any) {
    this.edit = true
    
    
    this.btnSiguiente=false;
    this.form.setValue(
      {
        name:element.name,
        platform:element.platform,
        status: element.status
      }
      )
      if(element.status)this.form.get('platform').disable()
     
    this.carouselService.carouselSubject$.next(element)
    this.openAdd()

  }

  update(){
    const carousel = this.carouselService.carouselSubject$.value;
    this.carouselService.updateCarousel(carousel.id, this.form.value).subscribe(
      res=>{
        this.carouselService.carouselSubject$.next(null)
      }
    )
    
  }
}
