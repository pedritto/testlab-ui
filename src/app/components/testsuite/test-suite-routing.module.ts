import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestSuiteDetailsComponent }    from './test-suite-details/test-suite-details.component';
import { TestSuiteListComponent }    from './test-suite-list/test-suite-list.component';

const testSuiteRoutes: Routes = [
  { path: 'testsuites', component: TestSuiteListComponent },
  { path: 'testsuite/:id', component: TestSuiteDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(testSuiteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestSuiteRoutingModule { }
