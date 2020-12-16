import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaritemparticipanteobservacionesComponent } from './actualizaritemparticipanteobservaciones.component';

describe('ActualizaritemparticipanteobservacionesComponent', () => {
  let component: ActualizaritemparticipanteobservacionesComponent;
  let fixture: ComponentFixture<ActualizaritemparticipanteobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizaritemparticipanteobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaritemparticipanteobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
