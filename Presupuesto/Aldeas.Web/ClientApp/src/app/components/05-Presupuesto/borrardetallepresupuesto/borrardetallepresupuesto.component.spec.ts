import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrardetallepresupuestoComponent } from './borrardetallepresupuesto.component';

describe('BorrardetallepresupuestoComponent', () => {
  let component: BorrardetallepresupuestoComponent;
  let fixture: ComponentFixture<BorrardetallepresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrardetallepresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrardetallepresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
