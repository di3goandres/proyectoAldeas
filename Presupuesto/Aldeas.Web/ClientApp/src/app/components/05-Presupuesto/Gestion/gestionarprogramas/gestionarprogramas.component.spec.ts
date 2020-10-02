import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarprogramasComponent } from './gestionarprogramas.component';

describe('GestionarprogramasComponent', () => {
  let component: GestionarprogramasComponent;
  let fixture: ComponentFixture<GestionarprogramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarprogramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarprogramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
