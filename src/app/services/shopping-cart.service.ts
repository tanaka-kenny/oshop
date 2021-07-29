import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCart {

  constructor(private db: AngularFireDatabase) { }

  private creatID(){
     return this.db.list('/shopping-carts').push({
       dateCreated: new Date().getTime()
     });
  }

  private getCart(cartID: string) {
    return this.db.object('/shopping-carts'+ cartID);
  }

  private async getOrCreateCartID() {
    let cartID:any = localStorage.getItem('cartID');
    if (cartID) return cartID;

    // otherwise we need to create it on firebase 
    let result = await this.creatID();
    const id: any = result.key;
    localStorage.setItem('cartID', id)
    return id;
  }

  private getItem(cartID: string, productID: string) {
    return this.db.object<Item>('/shopping-carts/' + cartID + '/items/' + productID);
  }

  async addToCart(product: any) {
    // first get ref to users cart
    let cartID = await this.getOrCreateCartID();
    let item$ = this.getItem(cartID, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let initial_quantity: any =  item.payload.val()?.quantity;
      item$.update({ product: product.payload.val() ,quantity: (initial_quantity || 0) + 1 });
    })
  }
}
