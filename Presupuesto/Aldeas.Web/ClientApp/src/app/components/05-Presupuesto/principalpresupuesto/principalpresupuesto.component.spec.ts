import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalpresupuestoComponent } from './principalpresupuesto.component';

describe('PrincipalpresupuestoComponent', () => {
  let component: PrincipalpresupuestoComponent;
  let fixture: ComponentFixture<PrincipalpresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalpresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalpresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
