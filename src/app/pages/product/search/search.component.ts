import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Initialize with all products
    this.productService.getProducts().subscribe(products => {
      this.filteredProducts = products;
    });
  }

  search() {
    this.productService.searchProducts(this.searchTerm).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
