import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarindicadorComponent } from './registrarindicador.component';

describe('RegistrarindicadorComponent', () => {
  let component: RegistrarindicadorComponent;
  let fixture: ComponentFixture<RegistrarindicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarindicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarindicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
