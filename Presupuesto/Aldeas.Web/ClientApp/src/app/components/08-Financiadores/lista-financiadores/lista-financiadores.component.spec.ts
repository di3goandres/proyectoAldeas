import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFinanciadoresComponent } from './lista-financiadores.component';

describe('ListaFinanciadoresComponent', () => {
  let component: ListaFinanciadoresComponent;
  let fixture: ComponentFixture<ListaFinanciadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFinanciadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFinanciadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
