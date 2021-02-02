import { map, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { SnackBarComponent } from 'src/app/components/shared/snack-bar/snack-bar.component';
import { Product } from 'src/app/modals/product.model';
import { Category } from '../../categories/interfaces/category';
import { Brand } from '../../brands/interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar

  ) {

  }

  //categoias
  getCategory() {
    return this._http.get<Category[]>(`${environment.API}category`).pipe(
      take(1)
    )
  }

  //brands
  getBrands() {
    return this._http.get<Brand[]>(`${environment.API}brand`).pipe(
      take(1)
    )
  }


  ///Productos
  getProductos() {
    return this._http.get<Product[]>(`${environment.API}products`).pipe(
      take(1)
    )
  }

  addProducto(data) {
    return this._http.post<Product>(`${environment.API}product`, data).pipe(
      take(1)
    )
  }

  deleteProducto(id) {
    return this._http.delete<Product>(`${environment.API}product/${id}`).pipe(
      take(1)
    )
  }
  updateProducto(id, data){
    return this._http.post<Product>(`${environment.API}product/${id}`, data).pipe(
      take(1)
    )
  }
  /////

//   //////Models
//   getModels() {
//     return this._http.get<VehicleModel>(`${environment.API}vehicle-model-all`)
//   }

//   getModelsByIDBrand(brand_id: number) {
//     return this._http.get<VehicleModel>(`${environment.API}brand/${brand_id}`)
//   }

//   addModel(data) {
//     return this._http.post<VehicleModel>(`${environment.API}vehicle-model`, data).pipe(
//       take(1)
//     )
//   }

//   deleteModel(id) {
//     return this._http.delete<VehicleModel>(`${environment.API}vehicle-model/${id}`).pipe(
//       take(1)
//     )
//   }

//   updateModel(id, data){
//     return this._http.put<VehicleModel>(`${environment.API}vehicle-model/${id}`, data).pipe(
//       take(1)
//     )
//   }

//   ///// Sub Modelos
//   getSubModel() {
//     return this._http.get<VehicleSubModel>(`${environment.API}vehicle-sub-model`)
//   }
//   getSubModelByModelId(model_id){
//     return this._http.get<VehicleModel>(`${environment.API}vehicle-model/${model_id}`)

//   }

//   addSubModel(data) {
//     return this._http.post<VehicleSubModel>(`${environment.API}vehicle-sub-model`, data).pipe(
//       take(1)
//     )
//   }
//   deleteSubModel(id) {
//     return this._http.delete<VehicleSubModel>(`${environment.API}vehicle-sub-model/${id}`).pipe(
//       take(1)
//     )
//   }

//   updateSubModel(id, data){
//     return this._http.put<VehicleSubModel>(`${environment.API}vehicle-sub-model/${id}`, data).pipe(
//       take(1)
//     )
//   }
// //////


// /////Attributes

// getAttributes() {
//   return this._http.get<Attributes>(`${environment.API}attributes`)
// }

// addAttribute(data) {
//   return this._http.post<Attributes>(`${environment.API}attributes`, data).pipe(
//     take(1)
//   )
// }
// deleteAttribute(id) {
//   return this._http.delete<Attributes>(`${environment.API}attributes/${id}`).pipe(
//     take(1)
//   )
// }


// ////////

// /////Extras

// getExtras() {
//   return this._http.get<Extras>(`${environment.API}extras`)
// }

// addExtra(data) {
//   return this._http.post<Extras>(`${environment.API}extras`, data).pipe(
//     take(1)
//   )
// }
// deleteExtra(id) {
//   return this._http.delete<Extras>(`${environment.API}extras/${id}`).pipe(
//     take(1)
//   )
// }


// ////////

// /////Conditions
// getCondition(){
//   return this._http.get<any>(`${environment.API}conditions`)

// }

// ////////////////////

// /////Currencies
// getCurrencies(){
//   return this._http.get<any>(`${environment.API}currency`)

// }

// ////////////////////

// /////PriceCondition
// getPriceConditions(){
//   return this._http.get<any>(`${environment.API}price-conditions`)

// }

////////////////////
  openSnackBar(estadoRes, message: string) {
    let classToast: string;
    switch (estadoRes) {
      case "success":
        classToast = "toastSuccess"
        break;
      case "warn":
        classToast = "toastWarn"
        break;
      case "error":
        classToast = "toastError"
        break;

      default:
        classToast = "toastError"
        break;
    }

    const durationSeconds = 5;
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: [classToast],
      verticalPosition: 'top',
      duration: durationSeconds * 1000,
    });
  }
}
