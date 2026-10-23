import { Component, input } from '@angular/core';

@Component({
  selector: 'tasker-tool-container-item',
  standalone: false,
  templateUrl: './tool-container-item.html',
})
export class ToolContainerItem {
  title = input.required<string>();
  icon = input<string>('');
}
