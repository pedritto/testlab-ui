import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Category } from 'types/category'
import { TestCaseComponent } from 'app/test-case/test-case.component';
import { TestCase } from 'types/testCase';
import {
  CREATE_TEST_CASES_MUTATION,
  DELETE_TEST_CASES_MUTATION,
  UPDATE_TEST_CASES_MUTATION } from 'constants/testCase.graphql';

interface NewPayload {
  name: string,
  description: string,
  categoryId: string
}

interface UpdatePayload {
  id: string,
  name: string,
  description: string,
  categoryId: string
}

@Component({
  selector: 'app-test-case-row',
  templateUrl: './test-case-row.component.html',
  styleUrls: ['./test-case-row.component.css']
})
export class TestCaseRowComponent {

  @Input() testCase: TestCase;
  @Input() editMode: boolean = false;
  @Input() categories: Category[];
  @Output() onMutationDone = new EventEmitter();
  @ViewChild(TestCaseComponent) testCaseComponent;

  constructor(private apollo: Apollo) {
  }

  cancelTestCase() {
    this.editMode = false;
    this.onMutationDone.emit();
  }

  deleteTestCase() {
    this.apollo.mutate({
      mutation: DELETE_TEST_CASES_MUTATION,
      variables: {
        id: this.testCase.id
      },
    }).subscribe(
      ({ data }) => {
        this.onMutationDone.emit();
      },
      (error) => {}
    );
  }

  editTestCase() {
    this.editMode = true;
  }

  prepareUpdatePayload() : UpdatePayload {
    const { name, description, categoryId } = this.testCaseComponent;
    const { id } = this.testCase;
    return {
      id,
      name,
      description,
      categoryId
    };
  }

  prepareCreatePayload() : NewPayload {
    const { name, description, categoryId } = this.testCaseComponent;
    return {
      name,
      description,
      categoryId
    };
  }

  saveTestCase() {
    this.editMode = false;

    const mutation = this.testCase.id ? UPDATE_TEST_CASES_MUTATION : CREATE_TEST_CASES_MUTATION;
    const variables = this.testCase.id ? this.prepareUpdatePayload() : this.prepareCreatePayload();
    this.apollo.mutate({ mutation, variables })
      .subscribe(
        ({ data }) => {
          this.onMutationDone.emit();
        },
        (error) => {}
    );
  }

}
