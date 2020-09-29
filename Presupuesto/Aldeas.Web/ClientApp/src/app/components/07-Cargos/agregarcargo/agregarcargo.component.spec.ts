import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarcargoComponent } from './agregarcargo.component';

describe('AgregarcargoComponent', () => {
  let component: AgregarcargoComponent;
  let fixture: ComponentFixture<AgregarcargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarcargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
