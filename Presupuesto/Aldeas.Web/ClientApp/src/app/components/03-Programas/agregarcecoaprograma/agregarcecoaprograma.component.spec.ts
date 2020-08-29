import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarcecoaprogramaComponent } from './agregarcecoaprograma.component';

describe('AgregarcecoaprogramaComponent', () => {
  let component: AgregarcecoaprogramaComponent;
  let fixture: ComponentFixture<AgregarcecoaprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarcecoaprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcecoaprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
