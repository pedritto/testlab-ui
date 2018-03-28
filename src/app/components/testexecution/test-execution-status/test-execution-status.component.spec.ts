import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionStatusComponent } from './test-execution-status.component';

describe('TestExecutionStatusComponent', () => {
  let component: TestExecutionStatusComponent;
  let fixture: ComponentFixture<TestExecutionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecutionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
