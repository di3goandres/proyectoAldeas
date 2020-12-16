import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarfechaComponent } from './editarfecha.component';

describe('EditarfechaComponent', () => {
  let component: EditarfechaComponent;
  let fixture: ComponentFixture<EditarfechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarfechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarfechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
