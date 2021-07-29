import { SnapshotAction } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: any[] = [];
  filteredProducts: any;
  category: any;
  cart: SnapshotAction<CartItem> | any;
  subscription: Subscription | any;

  constructor(
    private activeRoute: ActivatedRoute,
    private productSerive: ProductService,
    private cartService: ShoppingCart) { 

    this.productSerive.getAllProducts().snapshotChanges().subscribe(products => {
      this.products = products;
      
      activeRoute.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        // filter products according to cateory
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.payload.val().category === this.category) : this.products;
      });
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
