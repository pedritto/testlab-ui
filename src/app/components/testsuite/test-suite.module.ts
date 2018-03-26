import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { TestSuiteListComponent }    from './test-suite-list/test-suite-list.component';

import { TestSuiteRoutingModule } from './test-suite-routing.module';
import { AppCommonModule } from 'app/components/common/app-common.module';

@NgModule({
  imports: [
    AppCommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestSuiteRoutingModule
  ],
  declarations: [
    TestSuiteListComponent
  ],
  providers: [ ]
})
export class TestSuiteModule {}
