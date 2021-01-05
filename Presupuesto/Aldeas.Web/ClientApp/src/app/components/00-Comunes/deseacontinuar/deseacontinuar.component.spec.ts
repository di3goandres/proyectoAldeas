import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseacontinuarComponent } from './deseacontinuar.component';

describe('DeseacontinuarComponent', () => {
  let component: DeseacontinuarComponent;
  let fixture: ComponentFixture<DeseacontinuarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeseacontinuarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeseacontinuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
