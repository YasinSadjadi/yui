import { Injectable, signal } from '@angular/core';

export const YUI_EN = {
  "loading": "Loading",
  "loadingMore": "Loading...",
  "closeModal": "Close modal",
  "dismiss": "Dismiss notification",
  "timeline": "Timeline",
  "upcoming": "Upcoming",
  "navigation": "Navigation",
  "noItems": "No items.",
  "expand": "Expand",
  "collapse": "Collapse",
  "submit": "Submit",
  "reset": "Reset",
  "addNew": "Add New",
  "loadError": "Couldn't load items",
  "checkConnection": "Check your connection and try again.",
  "emptyGrid": "No items to display",
  "emptyGridHint": "Items will appear here when they are available.",
  "rowsPerPage": "Rows per page",
  "of": "of",
  "pagination": "Pagination",
  "previousPage": "Previous page",
  "nextPage": "Next page",
  "selectDate": "Select a date",
  "chooseDate": "Choose a date",
  "previousMonth": "Previous month",
  "nextMonth": "Next month",
  "chooseDay": "Choose a day",
  "today": "Today",
  "clear": "Clear",
  "nothingToShow": "Nothing to show",
  "selectItems": "Select items...",
  "selected": "selected"
} as const;
export type YuiMessages = { [K in keyof typeof YUI_EN]: string };

@Injectable({ providedIn: 'root' })
export class YuiI18n {
  readonly locale = signal('en');
  readonly messages = signal<YuiMessages>({ ...YUI_EN });
  setLanguage(locale: string, messages: Partial<YuiMessages> = {}): void {
    this.locale.set(locale);
    this.messages.set({ ...YUI_EN, ...messages });
  }
}
