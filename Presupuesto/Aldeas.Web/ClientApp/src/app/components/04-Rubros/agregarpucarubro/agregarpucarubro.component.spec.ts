import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpucarubroComponent } from './agregarpucarubro.component';

describe('AgregarpucarubroComponent', () => {
  let component: AgregarpucarubroComponent;
  let fixture: ComponentFixture<AgregarpucarubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarpucarubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpucarubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
