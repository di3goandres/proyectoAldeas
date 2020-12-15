import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarparticipanteComponent } from './actualizarparticipante.component';

describe('ActualizarparticipanteComponent', () => {
  let component: ActualizarparticipanteComponent;
  let fixture: ComponentFixture<ActualizarparticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarparticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarparticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
