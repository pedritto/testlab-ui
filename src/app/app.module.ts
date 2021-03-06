import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './apollo.config';

import { TestCaseModule } from 'app/components/testcase/test-case.module';
import { TestSuiteModule } from 'app/components/testsuite/test-suite.module';
import { TestExecutionModule } from 'app/components/testexecution/test-execution.module';

import { CategoryService } from './services/graphql/category.service';
import { EnvironmentService } from './services/graphql/environment.service';
import { TestCaseService } from './services/graphql/test-case.service';
import { TestSuiteService } from './services/graphql/test-suite.service';
import { TestExecutionService } from './services/graphql/test-execution.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GraphQLModule,
    FormsModule,
    TestCaseModule,
    TestSuiteModule,
    TestExecutionModule
  ],
  providers: [
    CategoryService,
    EnvironmentService,
    TestCaseService,
    TestSuiteService,
    TestExecutionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
