import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFamiliarpresupuestoprogramaComponent } from './detalle-familiarpresupuestoprograma.component';

describe('DetalleFamiliarpresupuestoprogramaComponent', () => {
  let component: DetalleFamiliarpresupuestoprogramaComponent;
  let fixture: ComponentFixture<DetalleFamiliarpresupuestoprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFamiliarpresupuestoprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFamiliarpresupuestoprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
