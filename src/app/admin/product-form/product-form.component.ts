import { Product } from './../../models/product.model';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$:Observable<any[]>;
  id;
  requestedProd: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private catergoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = catergoryService.getAllCateogories();

    // get product to be edited
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getRequestedProduct(this.id).snapshotChanges().subscribe(product => {
        this.requestedProd = product;
      });
    }
  }

  ngOnInit(): void {
  
  }

  save(product:any) {

    if (this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) return;
  
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
