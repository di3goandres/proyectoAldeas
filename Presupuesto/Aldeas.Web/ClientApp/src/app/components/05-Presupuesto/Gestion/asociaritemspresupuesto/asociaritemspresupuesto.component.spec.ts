import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociaritemspresupuestoComponent } from './asociaritemspresupuesto.component';

describe('AsociaritemspresupuestoComponent', () => {
  let component: AsociaritemspresupuestoComponent;
  let fixture: ComponentFixture<AsociaritemspresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociaritemspresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociaritemspresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
