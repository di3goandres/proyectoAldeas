import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlycecoeditComponent } from './onlycecoedit.component';

describe('OnlycecoeditComponent', () => {
  let component: OnlycecoeditComponent;
  let fixture: ComponentFixture<OnlycecoeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlycecoeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlycecoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
