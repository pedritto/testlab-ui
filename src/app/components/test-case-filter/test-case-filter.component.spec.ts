import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseFilterComponent } from './test-case-filter.component';

describe('TestCaseFilterComponent', () => {
  let component: TestCaseFilterComponent;
  let fixture: ComponentFixture<TestCaseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
