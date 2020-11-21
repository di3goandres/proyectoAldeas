import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CecoseditComponent } from './cecosedit.component';

describe('CecoseditComponent', () => {
  let component: CecoseditComponent;
  let fixture: ComponentFixture<CecoseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CecoseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CecoseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
