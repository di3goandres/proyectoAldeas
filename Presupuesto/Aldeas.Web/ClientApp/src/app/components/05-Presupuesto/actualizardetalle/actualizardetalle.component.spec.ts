import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizardetalleComponent } from './actualizardetalle.component';

describe('ActualizardetalleComponent', () => {
  let component: ActualizardetalleComponent;
  let fixture: ComponentFixture<ActualizardetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizardetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizardetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
