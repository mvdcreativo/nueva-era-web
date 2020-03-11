import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentMethodsComponent } from './admin-payment-methods.component';

describe('AdminPaymentMethodsComponent', () => {
  let component: AdminPaymentMethodsComponent;
  let fixture: ComponentFixture<AdminPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
