import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalModule, NotificationModule, YuiI18n, YUI_FA } from 'yui';
import { showcasePages } from './showcase-pages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ModalModule, NotificationModule],
  styles: [`
    .nav-active, .nav-active:hover {
      background: var(--color-accent);
      color: var(--color-skin);
    }
  `],
  template: `
    <div class="min-h-screen bg-skin-dark text-dark md:flex">
      <aside class="w-full shrink-0 border-b border-skin-darker bg-skin p-5 md:fixed md:inset-y-0 md:w-64 md:overflow-y-auto md:border-b-0 md:border-e">
        <a routerLink="/badge" class="mb-1 block text-2xl font-bold text-accent">yui</a>
        <div class="mb-7 flex items-center justify-between gap-3">
          <p class="text-sm text-semi-dark">Angular component gallery</p>
          <button
            type="button"
            (click)="toggleTheme()"
            [attr.aria-label]="theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
            [attr.aria-pressed]="theme() === 'dark'"
            class="inline-flex shrink-0 items-center gap-2 rounded-lg border border-skin-darker bg-skin-dark/60 px-3 py-2 text-xs font-medium text-dark transition hover:border-accent/50 hover:bg-skin-dark focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <i class="bx" [class.bx-moon]="theme() === 'light'" [class.bx-sun]="theme() === 'dark'" aria-hidden="true"></i>
            <span>{{ theme() === 'dark' ? 'Light theme' : 'Dark theme' }}</span>
          </button>
        </div>
        <button
          type="button"
          (click)="toggleLanguage()"
          [attr.aria-label]="language() === 'en' ? 'Switch language to Persian' : 'Change language to English'"
          class="mb-5 rounded-lg border border-skin-darker bg-skin-dark/60 px-3 py-2 text-sm font-medium text-dark transition hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
        >{{ language() === 'en' ? 'فارسی' : 'English' }}</button>
        <nav class="grid grid-cols-2 gap-1 md:grid-cols-1" aria-label="Component pages">
          @for (item of pages; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="nav-active"
              class="rounded-lg px-3 py-2 text-sm text-semi-dark transition hover:bg-skin-dark hover:text-dark"
            >{{ item.title }}</a>
          }
        </nav>
        <p class="mt-8 text-xs text-semi-dark">Each page demonstrates a component group with working examples.</p>
      </aside>

      <main class="min-w-0 flex-1 p-5 md:ms-64 md:p-10">
        <router-outlet />
      </main>
      <tasker-notification />
      <tasker-modal />
    </div>
  `,
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(YuiI18n);
  readonly theme = signal<'light' | 'dark'>('light');
  readonly language = signal<'en' | 'fa'>('en');

  constructor() {
    let savedTheme: string | null = null;
    try {
      savedTheme = this.document.defaultView?.localStorage.getItem('yui-theme') ?? null;
    } catch {
      // Keep the gallery usable when browser storage is unavailable.
    }

    const prefersDark = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark) ? 'dark' : 'light';
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
    try {
      this.setLanguage(this.document.defaultView?.localStorage.getItem('yui-language') === 'fa' ? 'fa' : 'en');
    } catch {
      this.setLanguage('en');
    }
  }

  toggleLanguage(): void {
    const language = this.language() === 'en' ? 'fa' : 'en';
    this.setLanguage(language);
    try {
      this.document.defaultView?.localStorage.setItem('yui-language', language);
    } catch {
      // The active language still applies for this session without browser storage.
    }
  }

  private setLanguage(language: 'en' | 'fa'): void {
    this.language.set(language);
    this.i18n.setLanguage(language, language === 'fa' ? YUI_FA : {});
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }

  toggleTheme(): void {
    const theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
    try {
      this.document.defaultView?.localStorage.setItem('yui-theme', theme);
    } catch {
      // The active theme still applies for this session without browser storage.
    }
  }

  readonly pages = showcasePages.map(({ path, title }) => ({ path: `/${path}`, title }));
}

