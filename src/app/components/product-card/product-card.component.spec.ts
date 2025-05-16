import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      name: 'Test Product',
      description: 'Test description',
      price: 10,
      imageUrl: ''
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent adding to cart without size', () => {
    spyOn(window, 'alert');
    component.quantity = 1;
    component.size = '';
    component.onAddToCart();
    expect(window.alert).toHaveBeenCalledWith('Please select a size before adding to cart.');
  });

  it('should default quantity to 1 if set to 0 or negative', () => {
    component.quantity = -3;
    component.preventNegative();
    expect(component.quantity).toBe(1);
  });
});
