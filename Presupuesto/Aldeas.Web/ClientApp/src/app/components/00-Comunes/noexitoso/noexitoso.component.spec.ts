import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoexitosoComponent } from './noexitoso.component';

describe('NoexitosoComponent', () => {
  let component: NoexitosoComponent;
  let fixture: ComponentFixture<NoexitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoexitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoexitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
