import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarcecoComponent } from './actualizarceco.component';

describe('ActualizarcecoComponent', () => {
  let component: ActualizarcecoComponent;
  let fixture: ComponentFixture<ActualizarcecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarcecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarcecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
