import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: SnapshotAction<Product>[] = [];
  subscription: Subscription;
  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService) {
     this.subscription = this.productService.getAllProducts().snapshotChanges().subscribe(products => {
      this.filteredProducts = this.products = products;
     });
    }

   filterItems(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.payload.val()?.title.toLowerCase()
      .includes(query.toLowerCase())) : this.products;
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
