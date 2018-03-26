import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { FilterCommonComponent } from 'app/components/common/filter-common/filter-common.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FilterCommonComponent
  ],
  exports: [FilterCommonComponent],
  providers: [ ]
})
export class AppCommonModule {}
