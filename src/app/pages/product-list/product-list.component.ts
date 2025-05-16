import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  loading = true;
  isAdmin = false;

  ngOnInit(): void {
    this.checkUserRole();
    this.loadProducts();
  }

  checkUserRole(): void {
    this.isAdmin = KeycloakService.isAdmin(); // now checks for 'ROLE_admin'
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading products', err);
        this.loading = false;
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err: any) => console.error('Delete failed', err)
    });
  }
}
