import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any;
  category: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private productSerive: ProductService) { 

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



}
