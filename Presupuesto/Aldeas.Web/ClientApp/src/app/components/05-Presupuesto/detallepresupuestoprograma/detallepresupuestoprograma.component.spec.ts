import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepresupuestoprogramaComponent } from './detallepresupuestoprograma.component';

describe('DetallepresupuestoprogramaComponent', () => {
  let component: DetallepresupuestoprogramaComponent;
  let fixture: ComponentFixture<DetallepresupuestoprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallepresupuestoprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepresupuestoprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
