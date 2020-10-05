import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoselectComponent } from './cargoselect.component';

describe('CargoselectComponent', () => {
  let component: CargoselectComponent;
  let fixture: ComponentFixture<CargoselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
