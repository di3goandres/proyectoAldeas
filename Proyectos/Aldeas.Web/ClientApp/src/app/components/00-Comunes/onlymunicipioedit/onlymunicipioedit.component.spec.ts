import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlymunicipioeditComponent } from './onlymunicipioedit.component';

describe('OnlymunicipioeditComponent', () => {
  let component: OnlymunicipioeditComponent;
  let fixture: ComponentFixture<OnlymunicipioeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlymunicipioeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlymunicipioeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
