import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOtrospresupuestoprogramaComponent } from './detalle-otrospresupuestoprograma.component';

describe('DetalleOtrospresupuestoprogramaComponent', () => {
  let component: DetalleOtrospresupuestoprogramaComponent;
  let fixture: ComponentFixture<DetalleOtrospresupuestoprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleOtrospresupuestoprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleOtrospresupuestoprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
