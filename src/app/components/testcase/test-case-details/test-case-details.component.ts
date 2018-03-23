import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

import { TestCase } from 'types/testCase';
import { Category } from 'types/category';
import { TestCaseInput } from 'types/testCaseInput';
import { TestCaseService } from 'app/services/graphql/test-case.service';
import { CategoryService } from 'app/services/graphql/category.service';

@Component({
  selector: 'app-test-case-details',
  templateUrl: './test-case-details.component.html',
  styleUrls: ['./test-case-details.component.css']
})
export class TestCaseDetailsComponent implements OnInit {

  testCase: TestCase;
  testCaseForm: FormGroup;
  categories: Category[] = [];
  selectedCategory;
  newTestCase = {
    id: '',
    number: 'Add New ...',
    name: '',
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

  textPattern="^[a-zA-Z0-9\s ]+";

  constructor(
    private route: ActivatedRoute,
    private testCaseService: TestCaseService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    const textValidators = [Validators.required, Validators.pattern(this.textPattern)];
    this.testCaseForm = this.formBuilder.group({
      name: ['', textValidators],
      description: ['', textValidators],
      category: {}
    })
  }

  ngOnInit() {
    this.loadCategories(
      () => setTimeout(this.loadTestCase.bind(this), 10)
    );
  }

  loadCategories(onSuccess) {
    this.categoryService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        typeof onSuccess === 'function' && onSuccess();
      });
  }

  loadTestCase() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id: string = params.get('id');
        return this.getTestCase(id);
      })
      .subscribe((testCase: TestCase) => {
        this.setValues(testCase);
      });
  }

  getTestCase(id): Observable<TestCase> {
    if (id) {
      return this.testCaseService.getTestCase(id);
    } else {
      this.selectedCategory = this.categories[0];
      this.newTestCase.category = this.selectedCategory;
      return of(this.newTestCase);
    }
  }

  setValues(testCase) {
    const { name, description, category } = testCase;
    this.testCase = testCase;
    this.selectedCategory = category;
    this.testCaseForm.setValue({ name, description, category });
  }

  onSave() {
    if(this.validateForm()) {
      const {id} = this.testCase;
      if (id) {
        this.testCaseService
          .updateTestCase(id, this.prepareInput())
          .subscribe((testCase: TestCase) => {
            this.testCase = testCase;
          });
      } else {
        this.testCaseService
          .createTestCase(this.prepareInput())
          .subscribe((testCase: TestCase) => {
            this.testCase = testCase;
          });
      }
    }
  }

  prepareInput() : TestCaseInput {
    const { name, description, category } = this.testCaseForm.value;
    const categoryId = category.id;
    const testCaseInput: TestCaseInput = { name, description, categoryId };
    return testCaseInput;
  }

  validateForm() {
    Object.keys(this.testCaseForm.controls).forEach(field => {
      const control = this.testCaseForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.testCaseForm.valid;
  }

  get name() {
    return this.testCaseForm.get('name');
  }

  get description() {
    return this.testCaseForm.get('description');
  }

  get category() {
    return this.testCaseForm.get('category');
  }

}
