import { ShoppingCart } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {

  @Input('product') product: any;
  @Input('show-actions') showActions = true;

  constructor(
    private cartService: ShoppingCart
  ) { }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}
