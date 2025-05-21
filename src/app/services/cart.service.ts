import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private totalItems = new BehaviorSubject<number>(0);

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
      this.updateTotalItems();
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getTotalItems(): Observable<number> {
    return this.totalItems.asObservable();
  }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }

    this.updateTotalItems();
    this.saveCart();
  }

  updateQuantity(productId: number, change: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0 && newQuantity <= item.product.stock) {
        item.quantity = newQuantity;
        this.cartItems.next([...currentItems]);
        this.updateTotalItems();
        this.saveCart();
      }
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.updateTotalItems();
    this.saveCart();
  }

  clearCart() {
    this.cartItems.next([]);
    this.updateTotalItems();
    this.saveCart();
  }

  private updateTotalItems() {
    const total = this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems.next(total);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
} 