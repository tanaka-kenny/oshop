import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$:any;
  constructor(
    private catergoryService: CategoryService,
    private productService: ProductService) { 
    this.categories$ = catergoryService.getCateogories().snapshotChanges();
  }

  ngOnInit(): void {
  }

  save(product:any) {
    this.productService.create(product);
  }

}
