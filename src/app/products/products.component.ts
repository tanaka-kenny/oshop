import { CategoryService } from './../services/category.service';
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
  categories$: any;

  constructor(
    private productSerive: ProductService,
    private categoryService: CategoryService) { 

    this.products$ = this.productSerive.getAllProducts().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.key, obj: c.payload.val() })))
    );
    this.categories$ = this.categoryService.getAllCateogories();
  }



}
