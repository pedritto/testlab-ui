import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestCaseListComponent }    from './test-case-list/test-case-list.component';
import { TestCaseDetailsComponent }    from './test-case-details/test-case-details.component';

const testCasesRoutes: Routes = [
  { path: 'testcases', component: TestCaseListComponent },
  { path: 'testcase/:id', component: TestCaseDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(testCasesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestCaseRoutingModule { }
