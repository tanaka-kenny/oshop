import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

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

  private async getOrCreateCart() {
    let cartID:any = localStorage.getItem('cartID');

    if (!cartID) { // we need to create it on firebase 
      let result = await this.creatID();
      const id: any = result.key;
      localStorage.setItem('cartID', id)
      return this.getCart(id);
    } 
    
    return this.getCart(cartID);
  }
}
