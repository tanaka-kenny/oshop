import { Product } from './../models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list<Product>('/products');
  }

  getRequestedProduct(productID: string) {
    return this.db.object<Product>('/products/' + productID);
  }

  updateProduct(productID: string, product: Product) {
    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID: any) {
    return this.db.object('/products/'+productID).remove()
  }
}
