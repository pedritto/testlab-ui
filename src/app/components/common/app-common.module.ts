import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { FilterCommonComponent } from 'app/components/common/filter-common/filter-common.component';
import { NewItemCommonComponent } from 'app/components/common/new-item-common/new-item-common.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    FilterCommonComponent,
    NewItemCommonComponent
  ],
  exports: [FilterCommonComponent, NewItemCommonComponent],
  providers: [ ]
})
export class AppCommonModule {}
