import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { TestCaseListComponent }    from './test-case-list/test-case-list.component';
import { TestCaseDetailsComponent }    from './test-case-details/test-case-details.component';

import { TestCaseRoutingModule } from './test-case-routing.module';
import { AppCommonModule } from 'app/components/common/app-common.module';


@NgModule({
  imports: [
    AppCommonModule,
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
