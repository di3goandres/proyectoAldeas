import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeritemspresupuestonioComponent } from './veritemspresupuestonio.component';

describe('VeritemspresupuestonioComponent', () => {
  let component: VeritemspresupuestonioComponent;
  let fixture: ComponentFixture<VeritemspresupuestonioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeritemspresupuestonioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeritemspresupuestonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
