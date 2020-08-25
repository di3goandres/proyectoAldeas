import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroparticipantesComponent } from './registroparticipantes.component';

describe('RegistroparticipantesComponent', () => {
  let component: RegistroparticipantesComponent;
  let fixture: ComponentFixture<RegistroparticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroparticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroparticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
