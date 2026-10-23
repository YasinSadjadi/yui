import {Component, input, output} from '@angular/core';

@Component({
  selector: 'tasker-selected-item',
  standalone: false,
  templateUrl: './selected-item.html',
})
export class SelectedItem {
  title = input.required<string>();
  identifier = input.required<any>();
  
  delete = output<any>();
  
  onDelete() {
    this.delete.emit(this.identifier());
  }
}
