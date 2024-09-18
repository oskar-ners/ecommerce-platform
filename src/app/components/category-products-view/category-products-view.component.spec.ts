import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsViewComponent } from './category-products-view.component';

describe('CategoryProductsViewComponent', () => {
  let component: CategoryProductsViewComponent;
  let fixture: ComponentFixture<CategoryProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProductsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
