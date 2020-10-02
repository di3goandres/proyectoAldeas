import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarfinanciadoranioComponent } from './asociarfinanciadoranio.component';

describe('AsociarfinanciadoranioComponent', () => {
  let component: AsociarfinanciadoranioComponent;
  let fixture: ComponentFixture<AsociarfinanciadoranioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarfinanciadoranioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarfinanciadoranioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
