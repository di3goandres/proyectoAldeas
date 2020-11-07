import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinocheckpreguntaComponent } from './sinocheckpregunta.component';

describe('SinocheckpreguntaComponent', () => {
  let component: SinocheckpreguntaComponent;
  let fixture: ComponentFixture<SinocheckpreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinocheckpreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinocheckpreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
