import { Product } from 'src/app/modals/product.model';

export interface Order {
    id?:number;
    user_id?:number;
    name:string;
    lastname:string;
    ci?:string;
    company?: string;
    rut?: string;
    address?: string;
    city?: string;
    state?: string;
    email: string;
    phone?: string;
    productos: ProductOrder[];
    status_id?:number;
    status: Status;

}

export interface ProductOrder {
    quantity:number;
    product: Product
}

export interface Status{
    id:number;
    name?:string;
    code?:string;
}

