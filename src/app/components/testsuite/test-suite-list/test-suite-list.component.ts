import { Component, OnInit } from '@angular/core';

import { TestSuiteService } from 'app/services/graphql/test-suite.service';

import { Filter } from 'types/filter';
import { TestSuit } from 'types/testSuite';
import { TestSuiteFilter } from 'types/testSuiteFilter';

@Component({
  selector: 'app-test-suite-list',
  templateUrl: './test-suite-list.component.html',
  styleUrls: ['./test-suite-list.component.css']
})
export class TestSuiteListComponent implements OnInit {

  testSuites: TestSuit[] = [];
  itemPath: string = '/testsuite';
  filter: TestSuiteFilter = { searchText: '',  testCaseLimit: 0 };

  constructor(private testSuiteService: TestSuiteService) { }

  ngOnInit() {
    this.loadTestSuites();
  }

  loadTestSuites() {
    this.testSuiteService.fetchTestSuites()
      .subscribe((testSuites: TestSuit[]) => {
        this.testSuites = testSuites;
      });
  }

  applyFilter(filter: Filter) {
    this.filter = {
      searchText: filter.text,
      testCaseLimit: Number(filter.id)
    };
    this.filterTestSuites();
  }

  filterTestSuites() {
    this.testSuiteService.filterTestSuites(this.filter)
      .subscribe((testSuites: TestSuit[]) => {
        this.testSuites = testSuites;
      });
  }

  onDelete(testSuite: TestSuit){
    this.testSuiteService
      .deleteTestSuite(testSuite.id)
      .subscribe(() => this.loadTestSuites());
  }

}
