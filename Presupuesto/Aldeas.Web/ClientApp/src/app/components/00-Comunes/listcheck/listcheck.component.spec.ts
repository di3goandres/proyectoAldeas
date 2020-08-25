import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcheckComponent } from './listcheck.component';

describe('ListcheckComponent', () => {
  let component: ListcheckComponent;
  let fixture: ComponentFixture<ListcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
