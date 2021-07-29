import { ShoppingCart } from './../services/shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  cartItemsNo: number | any;
  constructor(
    public auth: AuthService,
    private cart: ShoppingCart) { 
  }

  logOut() {
    this.auth.logOut();
  }

  async ngOnInit() {
    let cart = await this.cart.getCart();

     cart.subscribe((cart: any) => {
       this.cartItemsNo = 0;
       let cartItem = cart.payload.val().items;
      for (let id in cartItem)
        this.cartItemsNo += cartItem[id].quantity
     })
  };

}
