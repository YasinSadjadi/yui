import { Component, input } from '@angular/core';

@Component({
  selector: 'tasker-section',
  standalone: false,
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {
  title = input<string>('');
}
