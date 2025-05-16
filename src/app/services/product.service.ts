import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private publicApiUrl = 'http://localhost:8081/api/public/products';
  private adminApiUrl = 'http://localhost:8081/api/admin/products';

  constructor(private http: HttpClient) {}

  // 🔁 TEST CONNECTION
  pingBackend(): Observable<any> {
    return this.http.get(this.publicApiUrl);
  }

  // 🟢 READ all (public)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.publicApiUrl);
  }

  // ✅ FIXED: READ one (admin)
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.adminApiUrl}/${id}`);
  }

  // 🟡 CREATE (admin)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.adminApiUrl, product);
  }

  // 🔵 UPDATE (admin)
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.adminApiUrl}/${id}`, product);
  }

  // 🔴 DELETE (admin)
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/${id}`);
  }
}
