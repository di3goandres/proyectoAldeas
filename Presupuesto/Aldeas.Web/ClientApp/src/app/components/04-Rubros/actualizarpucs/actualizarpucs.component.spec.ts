import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpucsComponent } from './actualizarpucs.component';

describe('ActualizarpucsComponent', () => {
  let component: ActualizarpucsComponent;
  let fixture: ComponentFixture<ActualizarpucsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarpucsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarpucsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
