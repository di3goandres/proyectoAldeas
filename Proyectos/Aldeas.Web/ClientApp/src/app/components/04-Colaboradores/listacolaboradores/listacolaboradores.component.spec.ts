import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacolaboradoresComponent } from './listacolaboradores.component';

describe('ListacolaboradoresComponent', () => {
  let component: ListacolaboradoresComponent;
  let fixture: ComponentFixture<ListacolaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacolaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacolaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
