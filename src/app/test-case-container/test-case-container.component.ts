import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Category } from 'types/category'
import { TestCase } from 'types/testCase'
import { TestCaseFilter } from 'types/testCaseFilter';

import { TestCaseFilterComponent } from '../test-case-filter/test-case-filter.component'

import { ALL_TEST_CASES_QUERY, FILTERED_TEST_CASES_QUERY } from 'constants/testCase.graphql';
import { ALL_CATEGORIES_QUERY } from 'constants/category.graphql'

@Component({
  selector: 'app-test-case-container',
  templateUrl: './test-case-container.component.html',
  styleUrls: ['./test-case-container.component.css']
})
export class TestCaseContainerComponent implements OnInit {

  testCases: TestCase[] = [];
  newTestCase: TestCase = null;
  categories: Category[] = [];
  @ViewChild(TestCaseFilterComponent) testCaseFilterComponent;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: ALL_TEST_CASES_QUERY
    }).valueChanges.subscribe((response: any) => {
      this.testCases = response.data.findAllTestCases;
    });

    this.apollo.watchQuery({
      query: ALL_CATEGORIES_QUERY
    }).valueChanges.subscribe((response: any) => {
      this.categories = response.data.findAllCategories;
    });
  }

  onFilter(testCaseFilter: TestCaseFilter) {
    this.apollo.watchQuery({
      query: FILTERED_TEST_CASES_QUERY,
      variables: {
        filter: testCaseFilter
      },
    }).valueChanges.subscribe((response: any) => {
      this.testCases = response.data.filterTestCases;
    });
  }

  onReload() {
    this.testCaseFilterComponent.executeSearch();
    this.newTestCase = null;
  }

  onNew() {
    this.newTestCase = this.buildNewTestCase();
  }

  buildNewTestCase(): TestCase {
    return {
      id: '',
      number: '',
      name: '',
      description: '',
      category: {
        id: '',
        name: ''
      }
    };
  }

}
