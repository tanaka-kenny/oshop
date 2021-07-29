import { Product } from 'src/app/models/product.model';

export interface Item {
    product: Product;
    quantity: number;
}
