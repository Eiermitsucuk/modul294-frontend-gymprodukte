import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() adminMode: boolean = false;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  quantity: number = 1;
  size: string = '';
  sizes = ['XS', 'S', 'M', 'L', 'XL'];

  private cartService = inject(CartService);
  dummyVariants: any;

  get shortDescription(): string {
    if (!this.product?.description) return '';
    return this.product.description.length > 60
      ? this.product.description.substring(0, 60) + '...'
      : this.product.description;
  }

  onEdit(): void {
    this.edit.emit(this.product.id);
  }

  onDelete(): void {
    this.delete.emit(this.product.id);
  }

  onAddToCart(): void {
    if (!this.size) {
      alert('Please select a size before adding to cart.');
      return;
    }

    if (this.quantity < 1) {
      alert('Quantity must be at least 1.');
      this.quantity = 1;
      return;
    }

    this.cartService.addToCart(this.product, this.quantity, this.size);
  }

  preventNegative(): void {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
}
