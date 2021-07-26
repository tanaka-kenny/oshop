import { map } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$: any;

  constructor(private productSerive: ProductService) { 
    this.products$ = this.productSerive.getAllProducts().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.key, obj: c.payload.val() })))
    );
  }



}
