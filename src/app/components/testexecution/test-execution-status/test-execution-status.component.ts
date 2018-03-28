import { Component, Input, OnInit } from '@angular/core';

import { TestExecution } from 'types/testExecution';
import { TestCaseExecution } from 'types/testCaseExecution';
import { TestResult } from 'types/testResult';

class Result {
  blocked: number;
  failed: number;
  passed: number;
  waiting: number;
}

@Component({
  selector: 'app-test-execution-status',
  templateUrl: './test-execution-status.component.html',
  styleUrls: ['./test-execution-status.component.css']
})
export class TestExecutionStatusComponent implements OnInit {

  @Input() testExecution: TestExecution;
  result: Result;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.result = {
      blocked: 0,
      failed: 0,
      passed: 0,
      waiting: 0
    };
    this.calculateResult();
  }

  calculateResult() {
    this.testExecution.testCaseExecutions.forEach((testCaseExecution: TestCaseExecution) => {
      switch(testCaseExecution.testResult) {
        case TestResult.Blocked:
          this.result.blocked++;
          break;
        case TestResult.Failed:
          this.result.failed++;
          break;
        case TestResult.Passed:
          this.result.passed++;
          break;
        case TestResult.Waiting:
          this.result.waiting++;
          break;
        default:
          break;
      }
    })
  }

}
