import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCategoryIconsComponent } from './slide-category-icons.component';

describe('SlideCategoryIconsComponent', () => {
  let component: SlideCategoryIconsComponent;
  let fixture: ComponentFixture<SlideCategoryIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCategoryIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCategoryIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
