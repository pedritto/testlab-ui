import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestExecutionListComponent } from './test-execution-list/test-execution-list.component';

const testExecutionsRoutes: Routes = [
  { path: 'executions', component: TestExecutionListComponent }
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
