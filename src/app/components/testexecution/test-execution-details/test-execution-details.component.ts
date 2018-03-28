import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TestExecution } from 'types/testExecution';
import { TestCaseExecution } from 'types/testCaseExecution';
import { TestCaseExecutionInput } from 'types/testCaseExecutionInput';

import { TestExecutionService } from 'app/services/graphql/test-execution.service';

@Component({
  selector: 'app-test-execution-details',
  templateUrl: './test-execution-details.component.html',
  styleUrls: ['./test-execution-details.component.css']
})
export class TestExecutionDetailsComponent implements OnInit {

  testExecution: TestExecution;

  constructor(
    private route: ActivatedRoute,
    private testExecutionService: TestExecutionService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id: string = params.get('id');
        return this.testExecutionService.getTestExecution(id);
      })
      .subscribe((testExecution: TestExecution) => {
        this.testExecution = testExecution;
      });
  }

  setResult(executionResult: TestCaseExecution) {
    const testCaseExecutionInput: TestCaseExecutionInput = {
      testCaseExecutionId: executionResult.id,
      testResult: executionResult.testResult
    };
    this.testExecutionService.updateTestResult(testCaseExecutionInput)
      .subscribe((result) => {
        Object.assign({}, this.testExecution, {
          testCaseExecutions: this.testExecution.testCaseExecutions.map((execution: TestCaseExecution) => {
            return execution.id === result.id ? result : execution;
          })
        })
      });
  }

}
