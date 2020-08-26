import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarprogramaComponent } from './actualizarprograma.component';

describe('ActualizarprogramaComponent', () => {
  let component: ActualizarprogramaComponent;
  let fixture: ComponentFixture<ActualizarprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
