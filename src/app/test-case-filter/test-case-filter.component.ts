import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Category } from 'types/category'
import { TestCaseFilter } from 'types/testCaseFilter'

@Component({
  selector: 'app-test-case-filter',
  templateUrl: './test-case-filter.component.html',
  styleUrls: ['./test-case-filter.component.css']
})
export class TestCaseFilterComponent implements OnInit {

  searchText: string = '';
  selectedCategory: Category;
  emptyOption = {id: '', name: ''};
  @Input() categories: Category[];
  @Output() onFilterApplied = new EventEmitter<TestCaseFilter>();
  @Output() onNewTestCase = new EventEmitter();

  constructor(private apollo: Apollo) {
  }

  prepareFilter(): TestCaseFilter {
    const categoryId: string = this.selectedCategory.id;
    const { searchText } = this;
    return{ searchText, categoryId };
  }

  executeSearch() {
    const filter: TestCaseFilter = this.prepareFilter();
    this.onFilterApplied.emit(filter);
  }

  onNew() {
    this.onNewTestCase.emit();
  }

  ngOnInit() {
    this.selectedCategory = this.emptyOption;
  }

}
