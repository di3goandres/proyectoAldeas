import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpresupuestoComponent } from './agregarpresupuesto.component';

describe('AgregarpresupuestoComponent', () => {
  let component: AgregarpresupuestoComponent;
  let fixture: ComponentFixture<AgregarpresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarpresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
