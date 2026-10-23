import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Timeline } from './timeline';

@NgModule({
  declarations: [Timeline],
  imports: [CommonModule],
  exports: [Timeline],
})
export class TimelineModule {}
