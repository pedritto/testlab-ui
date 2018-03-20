import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import { TestCaseComponent } from './components/test-case/test-case.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { TestCaseRowComponent } from './components/test-case-row/test-case-row.component';
import { TestCaseContainerComponent } from './components/test-case-container/test-case-container.component';
import { TestCaseFilterComponent } from './components/test-case-filter/test-case-filter.component';
import { TestCaseService } from './services/graphql/test-case.service';
import { CategoryService } from './services/graphql/category.service';

@NgModule({
  declarations: [
    AppComponent,
    TestCaseComponent,
    ActionButtonsComponent,
    TestCaseRowComponent,
    TestCaseContainerComponent,
    TestCaseFilterComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule
  ],
  providers: [TestCaseService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
