import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerindicadorparticipanteComponent } from './verindicadorparticipante.component';

describe('VerindicadorparticipanteComponent', () => {
  let component: VerindicadorparticipanteComponent;
  let fixture: ComponentFixture<VerindicadorparticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerindicadorparticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerindicadorparticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
