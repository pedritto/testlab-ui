import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule }        from './app-routing.module';

import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import { TestCaseService } from './services/graphql/test-case.service';
import { CategoryService } from './services/graphql/category.service';

import { TestCaseModule } from 'app/components/testcase/test-case.module';
//import { FilterCommonComponent } from 'app/components/common/filter-common/filter-common.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GraphQLModule,
    FormsModule,
    TestCaseModule
  ],
  providers: [TestCaseService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
