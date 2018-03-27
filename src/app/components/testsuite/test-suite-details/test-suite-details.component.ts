import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

import { TestCaseService } from 'app/services/graphql/test-case.service';
import { TestSuiteService } from 'app/services/graphql/test-suite.service';
import { CategoryService } from 'app/services/graphql/category.service';

import { TestSuit } from 'types/testSuite';
import { TestCase } from 'types/testCase';
import { Filter } from 'types/filter';
import { Category } from 'types/category';
import {TestSuiteInput} from "../../../../types/testSuiteInput";

@Component({
  selector: 'app-test-suite-details',
  templateUrl: './test-suite-details.component.html',
  styleUrls: ['./test-suite-details.component.css']
})
export class TestSuiteDetailsComponent implements OnInit {

  allTestCases: TestCase[] = [];
  filteredTestCases: TestCase[] = [];
  linkedTestCases: TestCase[] = [];
  filter: Filter = { text: '', id: ''};
  categories: Category[];
  testSuite: TestSuit;
  testSuiteForm: FormGroup;
  itemLabel: string = 'Category';
  textPattern="^[a-zA-Z0-9\s ]+";
  newTestSuite: TestSuit = {
    id: '',
    name: '',
    testCases: []
  };

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private testCaseService: TestCaseService,
    private testSuiteService: TestSuiteService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadTestSuite();

    this.categoryService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  createForm() {
    const textValidators = [Validators.required, Validators.pattern(this.textPattern)];
    this.testSuiteForm = this.formBuilder.group({
      name: ['', textValidators]
    })
  }

  loadTestSuite() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id: string = params.get('id');
        return this.getTestSuite(id);
      })
      .subscribe((testSuit: TestSuit) => {
        this.setValues(testSuit);
        this.loadTestCases();
      });
  }

  loadTestCases() {
    this.testCaseService.fetchTestCases()
      .subscribe((testCases: TestCase[]) => {
        this.allTestCases = testCases.filter((testCase) => {
            return !this.isLinked(testCase);
        });
        this.filterTestCases();
      });
  }

  onRemove(testCase: TestCase) {
    this.allTestCases = this.allTestCases.concat(testCase);
    this.linkedTestCases = this.linkedTestCases.filter(tc => {
      return tc.id !== testCase.id;
    });
    this.filterTestCases();
  }

  isLinked(testCase: TestCase) {
    let added = false;
    this.linkedTestCases.forEach(tc => {
      if(tc.id === testCase.id) {
        added = true;
      }
    });
    return added;
  }

  linkTestCase(data) {
    this.linkedTestCases = this.linkedTestCases.concat(data.dragData);
    this.allTestCases = this.allTestCases.filter(testCase => {
      return testCase.id !== data.dragData.id;
    });
    this.filterTestCases();
  }

  applyFilter(filter: Filter) {
    this.filter = filter;
    this.filterTestCases();
  }

  filterTestCases() {
    this.filteredTestCases = this.allTestCases.filter(testCase => {
      const categoryMatch = !this.filter.id || testCase.category.id === this.filter.id;
      const numberMatch = !this.filter.text || testCase.number.includes(this.filter.text);
      const nameMatch = !this.filter.text || testCase.name.includes(this.filter.text);
      return categoryMatch && (numberMatch || nameMatch);
    });
  }

  getTestSuite(id): Observable<TestSuit> {
    if (id) {
      return this.testSuiteService.getTestSuite(id);
    } else {
      return of(this.newTestSuite);
    }
  }

  onSave() {
    if(this.validateForm()) {
      const {id} = this.testSuite;
      if (id) {
        this.testSuiteService
          .updateTestSuite(id, this.prepareInput())
          .subscribe((testSuit: TestSuit) => {
            this.setValues(testSuit);
          });
      } else {
        this.testSuiteService
          .createTestSuite(this.prepareInput())
          .subscribe((testSuit: TestSuit) => {
            this.setValues(testSuit);
          });
      }
    }
  }

  prepareInput() : TestSuiteInput {
    const { name } = this.testSuiteForm.value;
    const testCaseIds: string[] = this.linkedTestCases.map(testCase => {
      return testCase.id;
    });
    const testSuiteInput: TestSuiteInput = { name, testCaseIds };
    return testSuiteInput;
  }

  validateForm() {
    Object.keys(this.testSuiteForm.controls).forEach(field => {
      const control = this.testSuiteForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.testSuiteForm.valid;
  }

  setValues(testSuite: TestSuit) {
    this.testSuite = testSuite;
    const { name, testCases } = testSuite;
    this.linkedTestCases = testCases;
    this.testSuiteForm.setValue({ name });
  }

  get name() {
    return this.testSuiteForm.get('name');
  }

}
