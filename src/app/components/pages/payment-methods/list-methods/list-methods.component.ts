import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { OrdersService } from 'src/app/admin/modules/orders/services/orders.service';
import { PaymentMethodsService } from 'src/app/admin/modules/admin-payment-methods/services/payment-methods.service';

@Component({
  selector: 'list-methods',
  templateUrl: './list-methods.component.html',
  styleUrls: ['./list-methods.component.scss']
})
export class ListMethodsComponent implements OnInit {

  @Input('listMethods') listMethods;

  form : FormGroup

  @ViewChild(MatSelectionList, {static: true})
  private selectionList: MatSelectionList;
  
  constructor(
    private fb:FormBuilder,
    private orderService : OrdersService
    
  ) { }

  ngOnInit(){
    

    console.log(this.listMethods);
    
    /////formulario
    this.form = this.fb.group({
      cuotas : this.buildMethods()
    })
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);


  }

  changeCuotas(){
    this.form.reset()
    // console.log(this.form.value);
    
  }
  check(){

    let cuotasSelect = Object.assign({},this.form.value)
    cuotasSelect = Object.assign(cuotasSelect, {
      cuotas: cuotasSelect.cuotas.filter( v => v!==null)
    }) 
    
    const cuotas = cuotasSelect.cuotas[0]
    const id_medio_pago = this.selectionList.selectedOptions.selected[0].value;

    this.orderService.cuotas$.next(cuotas)
    this.orderService.id_medio_pago$.next(id_medio_pago)
     
    
  }

  buildMethods(){
    console.log(this.listMethods);

    const methodCuotas = this.listMethods.map(v => new FormControl(1))
    console.log(methodCuotas);

    return this.fb.array(methodCuotas);

  }

}
