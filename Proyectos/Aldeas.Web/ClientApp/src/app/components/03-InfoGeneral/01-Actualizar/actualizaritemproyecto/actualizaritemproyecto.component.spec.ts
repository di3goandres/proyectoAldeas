import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaritemproyectoComponent } from './actualizaritemproyecto.component';

describe('ActualizaritemproyectoComponent', () => {
  let component: ActualizaritemproyectoComponent;
  let fixture: ComponentFixture<ActualizaritemproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizaritemproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaritemproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
