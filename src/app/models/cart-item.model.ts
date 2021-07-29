import { Product } from 'src/app/models/product.model';

export interface CartItem {
    product: Product;
    quantity: number;
}
