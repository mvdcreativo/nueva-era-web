import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Category } from 'src/app/admin/modules/categories/interfaces/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'slide-category-icons',
  templateUrl: './slide-category-icons.component.html',
  styleUrls: ['./slide-category-icons.component.scss']
})
export class SlideCategoryIconsComponent implements OnInit, AfterViewInit {

  @Input() categories: Category[]
  urlFiles = environment.urlFiles;
  public config: SwiperConfigInterface = {};
  categoriesSort: Category[];

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    this.config = {
      slidesPerView: 11,
      spaceBetween: 10,
      centeredSlides: false,
      pagination: false,
      breakpoints: {
        480: {
          slidesPerView: 3.5
        },
        740: {
          slidesPerView: 4.5,
        },
        960: {
          slidesPerView: 7.5,
        },
        1280: {
          slidesPerView: 11,
        },


      }
    }
  }
}
