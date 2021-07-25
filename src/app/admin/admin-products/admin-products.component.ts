import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { SnapshotAction } from '@angular/fire/database';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {
  products: SnapshotAction<Product>[] = [];
  subscription: Subscription;
  columnsToDisplay = ['title', 'price', 'edit'];
  dataSource: any;

  @ViewChild(MatPaginator)
  paginator: any;

  constructor(
    private productService: ProductService) {
     this.subscription = this.productService.getAllProducts().snapshotChanges().subscribe(products => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;      
     });
    }

   filterItems(query: string) {
    this.dataSource = (query) ? 
      this.products.filter(p => p.payload.val()?.title.toLowerCase()
      .includes(query.toLowerCase())) : this.products;
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
