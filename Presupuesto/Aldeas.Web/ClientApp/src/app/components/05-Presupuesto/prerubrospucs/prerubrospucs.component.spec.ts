import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerubrospucsComponent } from './prerubrospucs.component';

describe('PrerubrospucsComponent', () => {
  let component: PrerubrospucsComponent;
  let fixture: ComponentFixture<PrerubrospucsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrerubrospucsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerubrospucsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
