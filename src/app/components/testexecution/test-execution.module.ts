import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { TestExecutionListComponent }    from './test-execution-list/test-execution-list.component';

import { TestExecutionRoutingModule } from './test-execution-routing.module';
import { AppCommonModule } from 'app/components/common/app-common.module';

@NgModule({
  imports: [
    AppCommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestExecutionRoutingModule
  ],
  declarations: [
    TestExecutionListComponent
  ],
  providers: [ ]
})
export class TestExecutionModule {}
