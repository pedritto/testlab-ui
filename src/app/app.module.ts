import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import { TestCaseComponent } from './test-case/test-case.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { TestCaseRowComponent } from './test-case-row/test-case-row.component';
import { TestCaseContainerComponent } from './test-case-container/test-case-container.component';
import { TestCaseFilterComponent } from './test-case-filter/test-case-filter.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
