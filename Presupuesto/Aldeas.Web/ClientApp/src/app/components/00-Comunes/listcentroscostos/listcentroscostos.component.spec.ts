import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcentroscostosComponent } from './listcentroscostos.component';

describe('ListcentroscostosComponent', () => {
  let component: ListcentroscostosComponent;
  let fixture: ComponentFixture<ListcentroscostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcentroscostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcentroscostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
