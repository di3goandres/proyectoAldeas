import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaprogramasComponent } from './listaprogramas.component';

describe('ListaprogramasComponent', () => {
  let component: ListaprogramasComponent;
  let fixture: ComponentFixture<ListaprogramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaprogramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaprogramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
