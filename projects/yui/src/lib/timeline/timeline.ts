import { Component, input } from '@angular/core';
import { TimelineItem } from './timeline-item';

@Component({
  selector: 'tasker-timeline',
  standalone: false,
  templateUrl: './timeline.html',
})
export class Timeline {
  items = input<TimelineItem[]>([]);
}
