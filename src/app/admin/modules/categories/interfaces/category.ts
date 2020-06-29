import { Product } from 'src/app/modals/product.model';

export interface Category {
    id?:number;
    name:string;
    slug:string;
    description?:string;
    products?:Product[];
}