import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcategoriaComponent } from './crearcategoria.component';

describe('CrearcategoriaComponent', () => {
  let component: CrearcategoriaComponent;
  let fixture: ComponentFixture<CrearcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
