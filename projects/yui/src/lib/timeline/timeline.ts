import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../i18n';
import { Component, input } from '@angular/core';
import { TimelineItem } from './timeline-item';

@Component({
  selector: 'tasker-timeline',
  standalone: false,
  templateUrl: './timeline.html',
})
export class Timeline {
  protected readonly i18n = injectYui(YuiI18n);
  items = input<TimelineItem[]>([]);
}
