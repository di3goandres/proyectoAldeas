import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiararchivoComponent } from './cambiararchivo.component';

describe('CambiararchivoComponent', () => {
  let component: CambiararchivoComponent;
  let fixture: ComponentFixture<CambiararchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiararchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiararchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
