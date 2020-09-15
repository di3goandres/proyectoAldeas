import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerprogramasasociadosComponent } from './verprogramasasociados.component';

describe('VerprogramasasociadosComponent', () => {
  let component: VerprogramasasociadosComponent;
  let fixture: ComponentFixture<VerprogramasasociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerprogramasasociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerprogramasasociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
