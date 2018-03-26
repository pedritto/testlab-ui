import { Component, OnInit } from '@angular/core';

import { TestCase } from 'types/testCase';
import { TestCaseFilter } from 'types/testCaseFilter'
import { Category } from 'types/category';
import { Filter } from 'types/filter'
import { TestCaseService } from 'app/services/graphql/test-case.service';
import { CategoryService } from 'app/services/graphql/category.service';

@Component({
  selector: 'app-test-case-list',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent implements OnInit {

  testCases: TestCase[] = [];
  categories: Category[] = [];
  itemLabel = 'Category';
  itemPath: string = '/testcase';
  filter: TestCaseFilter = { searchText: '',  categoryId: '' };

  constructor(
    private testCaseService: TestCaseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadTestCases();

    this.categoryService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  loadTestCases() {
    this.testCaseService.fetchTestCases()
      .subscribe((testCases: TestCase[]) => {
        this.testCases = testCases;
      });
  }

  applyFilter(filter: Filter) {
    this.filter = {
      searchText: filter.text,
      categoryId: filter.id
    };
    this.filterTestCases();
  }

  filterTestCases() {
    this.testCaseService.filterTestCases(this.filter)
      .subscribe((testCases: TestCase[]) => {
        this.testCases = testCases;
      });
  }

  onDelete(testCase){
    this.testCaseService
      .deleteTestCase(testCase.id)
      .subscribe(() => this.filterTestCases());
  }

}
