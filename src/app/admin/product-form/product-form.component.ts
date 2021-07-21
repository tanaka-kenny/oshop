import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$:any;
  constructor(
    private router: Router,
    private catergoryService: CategoryService,
    private productService: ProductService) { 
    this.categories$ = catergoryService.getCateogories().snapshotChanges();
  }

  ngOnInit(): void {
  }

  save(product:any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }

}
