import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // In a real application, you would fetch the product from a service
    // For now, we'll use sample data
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = {
      id: productId,
      name: `Product ${productId}`,
      description: 'This is a detailed description of the product. It includes all the important features and specifications that customers need to know.',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/400',
      category: 'Electronics',
      stock: 10
    };
  }
}
