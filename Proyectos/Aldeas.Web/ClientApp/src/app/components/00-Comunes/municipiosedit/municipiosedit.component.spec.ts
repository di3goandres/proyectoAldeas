import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioseditComponent } from './municipiosedit.component';

describe('MunicipioseditComponent', () => {
  let component: MunicipioseditComponent;
  let fixture: ComponentFixture<MunicipioseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
