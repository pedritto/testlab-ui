import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TestResult } from 'types/testResult';
import { TestCaseExecution } from 'types/testCaseExecution';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  @Input() testCaseExecution: TestCaseExecution;
  editMode: boolean = false;
  values: string[] = [];
  @Output() onStatusChanged = new EventEmitter<TestCaseExecution>();

  constructor() {
    for (const result in TestResult) {
      this.values.push(TestResult[result]);
    }
  }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
  }

  onChange(testResult) {
    this.testCaseExecution = Object.assign({}, this.testCaseExecution, { testResult });
    this.editMode = false;
    this.onStatusChanged.emit(this.testCaseExecution);
  }

  onClickedOutside() {
    this.editMode = false;
  }

  getBackground(result) {
    switch (result) {
      case TestResult.Blocked:
        return 'blocked';
      case TestResult.Failed:
        return 'failed';
      case TestResult.Passed:
        return 'passed';
      case TestResult.Waiting:
        return 'waiting';
    }
  }

  get background(): string {
    return this.getBackground(this.testCaseExecution.testResult);
  }

}
