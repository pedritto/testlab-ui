import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent  {

  @Input() editMode: boolean = false;

  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  constructor() { }

  onCancel() {
    this.cancelEvent.emit();
  }

  onDelete() {
    this.deleteEvent.emit();
  }

  onEdit() {
    this.editEvent.emit();
  }

  onSave() {
    this.saveEvent.emit();
  }

}
