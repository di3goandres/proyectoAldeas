import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPresupuestoComponent } from './actualizar-presupuesto.component';

describe('ActualizarPresupuestoComponent', () => {
  let component: ActualizarPresupuestoComponent;
  let fixture: ComponentFixture<ActualizarPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
