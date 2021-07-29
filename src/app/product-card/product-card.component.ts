import { SnapshotAction } from '@angular/fire/database';
import { ShoppingCart } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {

  @Input('product') product: any;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: CartItem | any;

  constructor(
    private cartService: ShoppingCart
  ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.payload.val().items[this.product.key];
    return item ? item.quantity : 0
    // console.log(item)
  }
}
