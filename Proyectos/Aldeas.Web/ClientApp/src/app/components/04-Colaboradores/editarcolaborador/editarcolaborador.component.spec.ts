import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcolaboradorComponent } from './editarcolaborador.component';

describe('EditarcolaboradorComponent', () => {
  let component: EditarcolaboradorComponent;
  let fixture: ComponentFixture<EditarcolaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcolaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarcolaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
