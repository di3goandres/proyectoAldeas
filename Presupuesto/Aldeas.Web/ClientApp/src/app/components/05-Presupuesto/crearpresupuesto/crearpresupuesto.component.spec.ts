import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpresupuestoComponent } from './crearpresupuesto.component';

describe('CrearpresupuestoComponent', () => {
  let component: CrearpresupuestoComponent;
  let fixture: ComponentFixture<CrearpresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
