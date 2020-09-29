import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacargosComponent } from './listacargos.component';

describe('ListacargosComponent', () => {
  let component: ListacargosComponent;
  let fixture: ComponentFixture<ListacargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
