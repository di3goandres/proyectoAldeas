import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarbasedatosComponent } from './descargarbasedatos.component';

describe('DescargarbasedatosComponent', () => {
  let component: DescargarbasedatosComponent;
  let fixture: ComponentFixture<DescargarbasedatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarbasedatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarbasedatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
