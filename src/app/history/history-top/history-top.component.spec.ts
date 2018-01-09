import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTopComponent } from './history-top.component';

describe('HistoryTopComponent', () => {
  let component: HistoryTopComponent;
  let fixture: ComponentFixture<HistoryTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
