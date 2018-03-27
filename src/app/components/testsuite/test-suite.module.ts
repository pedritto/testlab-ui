import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {DndModule} from 'ng2-dnd';

import { TestSuiteListComponent } from './test-suite-list/test-suite-list.component';
import { TestSuiteDetailsComponent } from './test-suite-details/test-suite-details.component';

import { TestSuiteRoutingModule } from './test-suite-routing.module';
import { AppCommonModule } from 'app/components/common/app-common.module';

@NgModule({
  imports: [
    AppCommonModule,
    CommonModule,
    DndModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TestSuiteRoutingModule
  ],
  declarations: [
    TestSuiteDetailsComponent,
    TestSuiteListComponent
  ],
  providers: [ ]
})
export class TestSuiteModule {}
