import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarcargoComponent } from './actualizarcargo.component';

describe('ActualizarcargoComponent', () => {
  let component: ActualizarcargoComponent;
  let fixture: ComponentFixture<ActualizarcargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarcargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarcargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
