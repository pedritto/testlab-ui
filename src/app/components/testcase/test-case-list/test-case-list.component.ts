import { Component, OnInit } from '@angular/core';

import { TestCase } from 'types/testCase';
import { TestCaseFilter } from 'types/testCaseFilter'
import { Category } from 'types/category';
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
  searchText: string = '';
  emptyOption: Category = {id: '', name: ''};
  selectedCategory: Category = this.emptyOption;

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

  applyFilter() {
    const filter: TestCaseFilter = this.prepareFilter();
    this.testCaseService.filterTestCases(filter)
      .subscribe((testCases: TestCase[]) => {
        this.testCases = testCases;
      });
  }

  prepareFilter(): TestCaseFilter {
    const categoryId: string = this.selectedCategory.id;
    const { searchText } = this;
    return{ searchText, categoryId };
  }

  onDelete(testCase){
    this.testCaseService
      .deleteTestCase(testCase.id)
      .subscribe(() => this.applyFilter());
  }

}
