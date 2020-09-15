import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarprogramasComponent } from './asociarprogramas.component';

describe('AsociarprogramasComponent', () => {
  let component: AsociarprogramasComponent;
  let fixture: ComponentFixture<AsociarprogramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarprogramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarprogramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
