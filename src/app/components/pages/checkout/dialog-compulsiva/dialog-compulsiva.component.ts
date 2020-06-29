import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProductDialogComponent } from 'src/app/components/shop/products/product-dialog/product-dialog.component';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-compulsiva',
  templateUrl: './dialog-compulsiva.component.html',
  styleUrls: ['./dialog-compulsiva.component.scss']
})
export class DialogCompulsivaComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  public viewCol: number = 25;
  urlFiles: string = environment.urlFiles;
  totalAmount: any;
  
  constructor(
    public dialogRef: MatDialogRef<DialogCompulsivaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private cartService: CartService,
    public productsService: ProductService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
   
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

    // Add to cart
  public addToCart(product: Product, quantity: number = 1) {

    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
  }

  
  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }
}
