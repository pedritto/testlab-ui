import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng4-click-outside';

import { TestExecutionDetailsComponent }    from './test-execution-details/test-execution-details.component';
import { TestExecutionListComponent }    from './test-execution-list/test-execution-list.component';
import { TestExecutionStatusComponent }    from './test-execution-status/test-execution-status.component';
import { TestResultComponent }    from './test-result/test-result.component';

import { TestExecutionRoutingModule } from './test-execution-routing.module';
import { AppCommonModule } from 'app/components/common/app-common.module';

@NgModule({
  imports: [
    AppCommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestExecutionRoutingModule,
    ClickOutsideModule
  ],
  declarations: [
    TestExecutionDetailsComponent,
    TestExecutionListComponent,
    TestExecutionStatusComponent,
    TestResultComponent
  ],
  providers: [ ]
})
export class TestExecutionModule {}
