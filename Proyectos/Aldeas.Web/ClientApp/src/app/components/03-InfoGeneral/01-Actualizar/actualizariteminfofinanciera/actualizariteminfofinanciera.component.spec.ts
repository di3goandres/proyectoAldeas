import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizariteminfofinancieraComponent } from './actualizariteminfofinanciera.component';

describe('ActualizariteminfofinancieraComponent', () => {
  let component: ActualizariteminfofinancieraComponent;
  let fixture: ComponentFixture<ActualizariteminfofinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizariteminfofinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizariteminfofinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
