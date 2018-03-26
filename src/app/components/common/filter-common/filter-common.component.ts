import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SelectOption } from 'types/selectOption';
import { Filter } from 'types/filter';

@Component({
  selector: 'app-filter-common',
  templateUrl: './filter-common.component.html',
  styleUrls: ['./filter-common.component.css']
})
export class FilterCommonComponent implements OnInit {

  searchText: string = '';
  emptyOption: SelectOption = {id: '', name: ''};
  selectedOption: SelectOption = this.emptyOption;
  @Input() showDropDown: boolean = true;
  @Input() itemName: string;
  @Input() items: [SelectOption];
  @Output() onFiltered = new EventEmitter<Filter>();

  constructor() { }

  ngOnInit() {
  }

  applyFilter() {
    const id: string = this.selectedOption.id;
    const text: string = this.searchText;
    const filter = { text, id };
    this.onFiltered.emit(filter);
  }

}
