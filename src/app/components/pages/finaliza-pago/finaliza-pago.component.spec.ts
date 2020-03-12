import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizaPagoComponent } from './finaliza-pago.component';

describe('FinalizaPagoComponent', () => {
  let component: FinalizaPagoComponent;
  let fixture: ComponentFixture<FinalizaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
