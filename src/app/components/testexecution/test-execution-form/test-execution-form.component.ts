import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TestSuiteService } from 'app/services/graphql/test-suite.service';
import { TestExecutionService } from 'app/services/graphql/test-execution.service';
import { EnvironmentService } from 'app/services/graphql/environment.service';

import { TestSuit } from 'types/testSuite';
import { TestExecution } from 'types/testExecution';
import { TestExecutionInput } from 'types/testExecutionInput';
import { Environment } from 'types/environment';

@Component({
  selector: 'app-test-execution-form',
  templateUrl: './test-execution-form.component.html',
  styleUrls: ['./test-execution-form.component.css']
})
export class TestExecutionFormComponent implements OnInit {

  testExecutionForm: FormGroup;
  testSuites: TestSuit[] = [];
  environments: Environment[] = [];

  constructor(
    private testSuiteService: TestSuiteService,
    private testExecutionService: TestExecutionService,
    private environmentService: EnvironmentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.testSuiteService.fetchTestSuites()
      .subscribe((testSuites: TestSuit[]) => {
        this.testSuites = testSuites;
      });
    this.environmentService.fetchEnvironments()
      .subscribe((environments: Environment[]) => {
        this.environments = environments;
      });
  }

  createForm() {
    this.testExecutionForm = this.formBuilder.group({
      environment: ['', Validators.required],
      testSuite: ['', Validators.required],
    })
  }

  onSave() {
    if(this.validateForm()) {
      const testExecutionInput: TestExecutionInput = {
        testSuiteId: this.testExecutionForm.value.testSuite.id,
        environmentId: this.testExecutionForm.value.environment.id
      };

      this.testExecutionService
        .createTestExecution(testExecutionInput)
        .subscribe((testExecution: TestExecution) => {
          this.router.navigate(['/execution/' + testExecution.id]);
        });
    }
  }

  validateForm() {
    Object.keys(this.testExecutionForm.controls).forEach(field => {
      const control = this.testExecutionForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.testExecutionForm.valid;
  }

  get testSuite() {
    return this.testExecutionForm.get('testSuite');
  }

  get environment() {
    return this.testExecutionForm.get('environment');
  }

}
