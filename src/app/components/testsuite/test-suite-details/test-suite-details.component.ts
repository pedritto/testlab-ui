import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';


import { TestSuiteService } from 'app/services/graphql/test-suite.service';
import { TestSuit } from "types/testSuite";
import { TestCase } from "types/testCase";

@Component({
  selector: 'app-test-suite-details',
  templateUrl: './test-suite-details.component.html',
  styleUrls: ['./test-suite-details.component.css']
})
export class TestSuiteDetailsComponent implements OnInit {


  testCases: TestCase[] = [];
  testSuiteForm: FormGroup;
  textPattern="^[a-zA-Z0-9\s ]+";
  newTestSuite: TestSuit = {
    id: '',
    name: '',
    testCases: []
  };

  constructor(
    private route: ActivatedRoute,
    private testSuiteService: TestSuiteService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadTestSuite();
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
      });
  }

  getTestSuite(id): Observable<TestSuit> {
    if (id) {
      return this.testSuiteService.getTestSuite(id);
    } else {
      return of(this.newTestSuite);
    }
  }

  setValues(testSuite: TestSuit) {
    const { name, testCases } = testSuite;
    this.testCases = testCases;
    this.testSuiteForm.setValue({ name });
  }

  get name() {
    return this.testSuiteForm.get('name');
  }

}
