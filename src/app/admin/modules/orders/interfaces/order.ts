import { Product } from 'src/app/modals/product.model';

export interface Order {
    id?:number;
    user_id?:number;
    total?:number;
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
    payment_method_id?:number;
    url_pdf?:string;
    talon_cobro?:string;


}

export interface ProductOrder {
    quantity:number;
    product: Product
    discount_user?: number;
    discount_product?: number;
}

export interface Status{
    id:number;
    name?:string;
    code?:string;
}

