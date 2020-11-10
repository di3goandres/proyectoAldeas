import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementocheckpreguntaComponent } from './complementocheckpregunta.component';

describe('ComplementocheckpreguntaComponent', () => {
  let component: ComplementocheckpreguntaComponent;
  let fixture: ComponentFixture<ComplementocheckpreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementocheckpreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementocheckpreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
