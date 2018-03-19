import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Category } from 'types/category'
import { TestCaseComponent } from 'app/test-case/test-case.component';
import { TestCase } from 'types/testCase';
import { DELETE_TEST_CASES_MUTATION, UPDATE_TEST_CASES_MUTATION } from 'constants/testCase.graphql';

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

  preparePayload() : UpdatePayload {
    const { name, description, categoryId } = this.testCaseComponent;
    return {
      id: this.testCase.id || '0',
      name,
      description,
      categoryId
    }
  }

  saveTestCase() {
    this.editMode = false;

    const variables: UpdatePayload = this.preparePayload();
    this.apollo.mutate({
      mutation: UPDATE_TEST_CASES_MUTATION,
      variables
    }).subscribe(
      ({ data }) => {
        this.onMutationDone.emit();
      },
      (error) => {}
    );
  }

}
