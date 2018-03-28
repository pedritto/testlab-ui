import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestExecutionDetailsComponent } from './test-execution-details/test-execution-details.component';
import { TestExecutionListComponent } from './test-execution-list/test-execution-list.component';

const testExecutionsRoutes: Routes = [
  { path: 'executions', component: TestExecutionListComponent },
  { path: 'execution/:id', component: TestExecutionDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(testExecutionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestExecutionRoutingModule { }
