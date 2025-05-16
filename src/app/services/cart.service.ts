import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product, quantity: number = 1, size: string = '') {
    const existing = this.items.find(
      i => i.product.id === product.id && i.size === size
    );
  
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity, size });
    }
  
    this.cartSubject.next(this.items);
  }  

  getItems() {
    return [...this.items];
  }

  clearCart() {
    this.items = [];
    this.cartSubject.next([]);
  }
}
