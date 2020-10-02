import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciadorfaltanteComponent } from './financiadorfaltante.component';

describe('FinanciadorfaltanteComponent', () => {
  let component: FinanciadorfaltanteComponent;
  let fixture: ComponentFixture<FinanciadorfaltanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanciadorfaltanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciadorfaltanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
