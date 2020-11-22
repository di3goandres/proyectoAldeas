import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerproyectosparticipantesComponent } from './verproyectosparticipantes.component';

describe('VerproyectosparticipantesComponent', () => {
  let component: VerproyectosparticipantesComponent;
  let fixture: ComponentFixture<VerproyectosparticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerproyectosparticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerproyectosparticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
