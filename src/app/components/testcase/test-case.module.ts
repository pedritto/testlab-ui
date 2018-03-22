import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { TestCaseListComponent }    from './test-case-list/test-case-list.component';
import { TestCaseDetailsComponent }    from './test-case-details/test-case-details.component';

import { TestCaseRoutingModule } from './test-case-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestCaseRoutingModule
  ],
  declarations: [
    TestCaseListComponent,
    TestCaseDetailsComponent
  ],
  providers: [ ]
})
export class TestCaseModule {}
