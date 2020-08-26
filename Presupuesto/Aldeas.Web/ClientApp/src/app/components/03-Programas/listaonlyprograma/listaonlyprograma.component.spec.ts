import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaonlyprogramaComponent } from './listaonlyprograma.component';

describe('ListaonlyprogramaComponent', () => {
  let component: ListaonlyprogramaComponent;
  let fixture: ComponentFixture<ListaonlyprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaonlyprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaonlyprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
