import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-item-common',
  templateUrl: './new-item-common.component.html',
  styleUrls: ['./new-item-common.component.css']
})
export class NewItemCommonComponent implements OnInit {

  @Input() itemPath: string;
  pathArray = [];

  constructor() { }

  ngOnInit() {
    this.pathArray = [this.itemPath, ''];
  }

}
