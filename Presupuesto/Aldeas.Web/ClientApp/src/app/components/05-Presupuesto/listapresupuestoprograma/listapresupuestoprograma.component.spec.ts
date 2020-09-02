import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapresupuestoprogramaComponent } from './listapresupuestoprograma.component';

describe('ListapresupuestoprogramaComponent', () => {
  let component: ListapresupuestoprogramaComponent;
  let fixture: ComponentFixture<ListapresupuestoprogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapresupuestoprogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapresupuestoprogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
