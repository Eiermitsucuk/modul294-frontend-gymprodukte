import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productId: number | null = null;

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: [''],
    imageUrl: ['']
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.productService.getProduct(this.productId).subscribe((product) => {
          // ✅ Patch explicitly to preserve imageUrl
          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl || ''
          });
        });
      }
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.productForm.patchValue({ imageUrl: base64 });
    };

    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.productForm.invalid) return;

    const product = this.productForm.value as Product;

    if (this.productId !== null) {
      this.productService.updateProduct(this.productId, product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
