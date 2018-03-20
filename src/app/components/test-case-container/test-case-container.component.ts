import { Component, OnInit, ViewChild } from '@angular/core';

import { Category } from 'types/category'
import { TestCase } from 'types/testCase'
import { TestCaseFilter } from 'types/testCaseFilter';

import { TestCaseService } from 'app/services/graphql/test-case.service';
import { CategoryService } from 'app/services/graphql/category.service';

import { TestCaseFilterComponent } from '../test-case-filter/test-case-filter.component'

@Component({
  selector: 'app-test-case-container',
  templateUrl: './test-case-container.component.html',
  styleUrls: ['./test-case-container.component.css']
})
export class TestCaseContainerComponent implements OnInit {

  testCases: TestCase[] = [];
  newTestCase: TestCase = null;
  categories: Category[] = [];
  editable: boolean = true;
  @ViewChild(TestCaseFilterComponent) testCaseFilterComponent;

  constructor(private categoryService: CategoryService, private testCaseService: TestCaseService) {
  }

  ngOnInit() {
    this.testCaseService.fetchTestCases()
      .subscribe((testCases: TestCase[]) => {
        this.testCases = testCases;
      });

    this.categoryService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  onFilter(testCaseFilter: TestCaseFilter) {
    this.testCaseService.filterTestCases(testCaseFilter)
      .subscribe((testCases: TestCase[]) => {
        this.testCases = testCases;
      });
  }

  onReload() {
    this.testCaseFilterComponent.executeSearch();
    this.newTestCase = null;
    this.editable = true;
  }

  onNew() {
    this.newTestCase = this.buildNewTestCase();
    this.editable = false;
  }

  disableEditMode() {
    this.editable = false;
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
