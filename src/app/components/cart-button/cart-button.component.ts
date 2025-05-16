import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="cart" (click)="goToCart()">
    🛒 {{ count }}
  </div>`,
  styles: [`
    .cart {
      position: fixed;
      top: 12px;
      right: 20px;
      background: #d32f2f;
      color: white;
      padding: 10px 16px;
      border-radius: 999px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
    }
  `]
})
export class CartButtonComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  count = 0;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.count = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
