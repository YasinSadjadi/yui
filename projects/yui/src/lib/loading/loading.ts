import { Component, input } from '@angular/core';

@Component({
  selector: 'tasker-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
  host: {
    class: 'inline-flex items-center justify-center align-middle',
  }
})
export class Loading {
  size = input<'sm' | 'md' | 'lg'>('md');
  type = input<'vertical' | 'horizontal' | 'horizonal' | 'simple'>('simple');
}
