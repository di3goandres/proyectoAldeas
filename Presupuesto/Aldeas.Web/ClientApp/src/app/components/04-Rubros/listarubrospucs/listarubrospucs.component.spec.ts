import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarubrospucsComponent } from './listarubrospucs.component';

describe('ListarubrospucsComponent', () => {
  let component: ListarubrospucsComponent;
  let fixture: ComponentFixture<ListarubrospucsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarubrospucsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarubrospucsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
