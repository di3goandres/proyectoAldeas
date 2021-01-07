import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaversionesComponent } from './listaversiones.component';

describe('ListaversionesComponent', () => {
  let component: ListaversionesComponent;
  let fixture: ComponentFixture<ListaversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaversionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
