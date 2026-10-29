import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../i18n';
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
  protected readonly i18n = injectYui(YuiI18n);
  size = input<'sm' | 'md' | 'lg'>('md');
  type = input<'vertical' | 'horizontal' | 'horizonal' | 'simple'>('simple');
}
