import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompulsivaComponent } from './dialog-compulsiva.component';

describe('DialogCompulsivaComponent', () => {
  let component: DialogCompulsivaComponent;
  let fixture: ComponentFixture<DialogCompulsivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompulsivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompulsivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
