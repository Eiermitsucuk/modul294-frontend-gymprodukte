import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  response: Product[] | null = null;

  ngOnInit(): void {
    this.productService.pingBackend().subscribe({
      next: (data: Product[]) => {
        this.response = data;
        console.log('Backend response:', data);
      },
      error: (err: any) => {
        this.response = [];
        console.error('Backend error:', err);
      }
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
