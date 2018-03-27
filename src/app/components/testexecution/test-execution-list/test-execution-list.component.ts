import { Component, OnInit } from '@angular/core';

import { TestExecution } from 'types/testExecution';

import { TestExecutionService } from 'app/services/graphql/test-execution.service';

@Component({
  selector: 'app-test-execution-list',
  templateUrl: './test-execution-list.component.html',
  styleUrls: ['./test-execution-list.component.css']
})
export class TestExecutionListComponent implements OnInit {

  constructor(
    private testExecutionService: TestExecutionService
  ) {}

  ngOnInit() {
    this.testExecutionService.fetchTestExecutions()
      .subscribe((testExecution: TestExecution) => {
        console.log(testExecution);
      })
  }

}
