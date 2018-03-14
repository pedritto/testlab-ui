import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseRowComponent } from './test-case-row.component';

describe('TestCaseRowComponent', () => {
  let component: TestCaseRowComponent;
  let fixture: ComponentFixture<TestCaseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
