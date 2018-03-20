import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Category } from 'types/category'
import { TestCaseComponent } from 'app/components/test-case/test-case.component';
import { TestCase } from 'types/testCase';

import { TestCaseService } from 'app/services/graphql/test-case.service';

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
  @Input() editable: boolean = true;
  @Input() categories: Category[];
  @Output() onEditMode = new EventEmitter();
  @Output() onMutationDone = new EventEmitter();
  @ViewChild(TestCaseComponent) testCaseComponent;

  constructor(private testCaseService: TestCaseService) {
  }

  cancelTestCase() {
    this.editMode = false;
    this.onMutationDone.emit();
  }

  editTestCase() {
    if(this.editable) {
      this.editMode = true;
      this.onEditMode.emit();
    }
  }

  deleteTestCase() {
    this.testCaseService
      .deleteTestCase(this.testCase.id)
      .subscribe(() => this.onMutationDone.emit());
  }

  saveTestCase() {
    this.editMode = false;

    if(this.testCase.id) {
      this.testCaseService
        .updateTestCase(this.prepareUpdatePayload())
        .subscribe(() => this.onMutationDone.emit());
    } else {
      this.testCaseService
        .createTestCase(this.prepareCreatePayload())
        .subscribe(() => this.onMutationDone.emit());
    }
  }

  prepareCreatePayload() : NewPayload {
    const { name, description, categoryId } = this.testCaseComponent;
    return { name, description, categoryId };
  }

  prepareUpdatePayload() : UpdatePayload {
    const { id } = this.testCase;
    return Object.assign(this.prepareCreatePayload(), { id })
  }

}
