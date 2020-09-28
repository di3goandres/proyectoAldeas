import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramatipoComponent } from './programatipo.component';

describe('ProgramatipoComponent', () => {
  let component: ProgramatipoComponent;
  let fixture: ComponentFixture<ProgramatipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramatipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramatipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
