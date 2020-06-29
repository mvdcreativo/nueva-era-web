import { Component, OnInit, AfterViewInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CarouselService } from '../services/carousel.service';
import { Carousel, ImagesSlide } from '../interfaces/carousel';
// import { Images, Product } from 'src/app/modules/products/interfaces/product';
// import { PublishService } from 'src/app/modules/ventas/services/publish.service';

@Component({
  selector: 'images-drag-drop',
  templateUrl: './images-drag-drop.component.html',
  styleUrls: ['./images-drag-drop.component.scss']
})
export class ImagesDragDropComponent implements OnInit {
  // @Input('data') data : any;
  publication_res: Object;
  progress: number = 0;
  showDelete : boolean = false;
  data: Carousel;
  images: ImagesSlide[] = [];
  constructor(
    private carouselService: CarouselService,

  ) { }

  ngOnInit(): void {

    // console.log(this.images);
    this.carouselService.carousel.subscribe(
      data => {
        this.data = data;
        this.images = data?.images?? []
        return this.data
      }
    )

  }



  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    console.log(this.images);
    const imagePosition = this.images.map((v,i)=> {
      return {id: v.id , position: i}
    })
    console.log(imagePosition);

    this.carouselService.updateImage(imagePosition)

  }


  uploadImage(e) {

    console.log(e);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = <FileList>e.target.files;

      const fileNames = [];
      // console.log(selectedFiles);

      // console.log(this.files);

      this.carouselService.uploadImage(this.data.id, selectedFiles)
 
    }

  }


 
  removeImage(id_image: number){
    this.carouselService.removeImageId(id_image, this.data.id)
  }


}
