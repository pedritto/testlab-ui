import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionDetailsComponent } from './test-execution-details.component';

describe('TestExecutionDetailsComponent', () => {
  let component: TestExecutionDetailsComponent;
  let fixture: ComponentFixture<TestExecutionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecutionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
