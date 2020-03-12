import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Output() cuotasChange = new EventEmitter<any>();
  @Output() methodChange = new EventEmitter<any>();


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

  changeCuotas(e,method_id){
    console.log(e);
    this.selectionList.selectedOptions.selected[0] = method_id
    // console.log(this.form.value);
    this.methodChange.emit(method_id)
    this.cuotasChange.emit(e.source.value);
  }
  check(e){

   


    let cuotasSelect = Object.assign({},this.form.value)
    cuotasSelect = Object.assign(cuotasSelect, {
      cuotas: cuotasSelect.cuotas.filter( v => v!==null)
    }) 
    
    const cuotas = cuotasSelect.cuotas[0]
    
    //  this.cuotasChange.emit(cuotas);
     this.methodChange.emit(e.option.value)
    //  this.cuotasChange.emit(null);


    
  }

  buildMethods(){
    console.log(this.listMethods);

    const methodCuotas = this.listMethods.map(v => new FormControl(1))
    console.log(methodCuotas);

    return this.fb.array(methodCuotas);

  }

}
