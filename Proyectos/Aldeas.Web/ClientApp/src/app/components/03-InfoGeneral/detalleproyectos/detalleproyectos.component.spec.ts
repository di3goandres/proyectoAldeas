import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleproyectosComponent } from './detalleproyectos.component';

describe('DetalleproyectosComponent', () => {
  let component: DetalleproyectosComponent;
  let fixture: ComponentFixture<DetalleproyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleproyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
