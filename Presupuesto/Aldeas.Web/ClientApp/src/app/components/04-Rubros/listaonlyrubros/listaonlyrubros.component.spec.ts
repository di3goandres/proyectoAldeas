import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaonlyrubrosComponent } from './listaonlyrubros.component';

describe('ListaonlyrubrosComponent', () => {
  let component: ListaonlyrubrosComponent;
  let fixture: ComponentFixture<ListaonlyrubrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaonlyrubrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaonlyrubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
