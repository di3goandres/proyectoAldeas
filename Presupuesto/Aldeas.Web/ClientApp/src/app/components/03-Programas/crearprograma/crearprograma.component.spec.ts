import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearprogramaComponent } from './crearprograma.component';

describe('CrearprogramaComponent', () => {
  let component: CrearprogramaComponent;
  let fixture: ComponentFixture<CrearprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
