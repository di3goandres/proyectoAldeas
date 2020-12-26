import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiarusuarioComponent } from './copiarusuario.component';

describe('CopiarusuarioComponent', () => {
  let component: CopiarusuarioComponent;
  let fixture: ComponentFixture<CopiarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopiarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
