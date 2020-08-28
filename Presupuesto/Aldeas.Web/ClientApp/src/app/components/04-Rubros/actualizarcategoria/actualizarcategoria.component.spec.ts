import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarcategoriaComponent } from './actualizarcategoria.component';

describe('ActualizarcategoriaComponent', () => {
  let component: ActualizarcategoriaComponent;
  let fixture: ComponentFixture<ActualizarcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
