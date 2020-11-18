import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListafechasComponent } from './listafechas.component';

describe('ListafechasComponent', () => {
  let component: ListafechasComponent;
  let fixture: ComponentFixture<ListafechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListafechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
