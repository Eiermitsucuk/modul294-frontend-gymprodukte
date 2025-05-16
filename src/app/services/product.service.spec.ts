import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch products', () => {
    const dummyProducts: Product[] = [
      { name: 'Test 1', price: 10, description: '', imageUrl: '' }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Test 1');
    });

    const req = httpMock.expectOne('http://localhost:8081/api/public/products');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should create a product', () => {
    const newProduct: Product = { name: 'New', price: 5, description: '', imageUrl: '' };

    service.createProduct(newProduct).subscribe(response => {
      expect(response.name).toBe('New');
    });

    const req = httpMock.expectOne('http://localhost:8081/api/admin/products');
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });
});
