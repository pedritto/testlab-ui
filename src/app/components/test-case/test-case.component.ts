import { Component, Input } from '@angular/core';

import { TestCase } from 'types/testCase';
import { Category } from 'types/category';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent {

  @Input() testCase: TestCase;
  @Input() name: string;
  @Input() description: string;
  @Input() categoryId: string;
  @Input() editMode: boolean;
  @Input() categories: Category[];

  constructor() {
  }

}
