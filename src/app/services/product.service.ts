import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone',
      description: 'Latest model with advanced features',
      price: 699.99,
      imageUrl: 'https://example.com/smartphone.jpg',
      category: 'Electronics',
      stock: 50
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      imageUrl: 'https://example.com/laptop.jpg',
      category: 'Electronics',
      stock: 30
    },
    {
      id: 3,
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      imageUrl: 'https://example.com/tshirt.jpg',
      category: 'Clothing',
      stock: 100
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return of(product);
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct = {
      ...product,
      id: this.products.length + 1
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products[index] = { ...product, id };
    return of(this.products[index]);
  }

  deleteProduct(id: number): Observable<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return of(void 0);
  }

  searchProducts(term: string): Observable<Product[]> {
    const searchTerm = term.toLowerCase();
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    return of(filteredProducts);
  }
} 