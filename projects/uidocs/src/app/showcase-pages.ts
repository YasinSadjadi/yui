import { Routes } from '@angular/router';
import { ShowcasePage } from './showcase-page.component';

export const showcasePages = [
  { path: 'badge', section: 'badge', title: 'Badge' },
  { path: 'button', section: 'button', title: 'Button' },
  { path: 'modal-form', section: 'modal-form', title: 'Modal form' },
  { path: 'input', section: 'input', title: 'Input' },
  { path: 'select', section: 'select', title: 'Select' },
  { path: 'searchable-select', section: 'searchable-select', title: 'Searchable select' },
  { path: 'multi-searchable-select', section: 'multi-searchable-select', title: 'Multi searchable select' },
  { path: 'loading', section: 'loading', title: 'Loading' },
  { path: 'modal', section: 'modal', title: 'Modal' },
  { path: 'grid-view', section: 'grid', title: 'Grid view' },
  { path: 'notification', section: 'notification', title: 'Notification' },
  { path: 'page-layout', section: 'page', title: 'Page layout' },
  { path: 'section', section: 'section', title: 'Section' },
  { path: 'tool-container', section: 'tool-container', title: 'Tool container' },
  { path: 'tool-container-item', section: 'tool-container-item', title: 'Tool container item' },
  { path: 'timeline', section: 'timeline', title: 'Timeline' },
  { path: 'tree-view', section: 'tree-view', title: 'Tree view' },
] as const;

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'badge' },
  ...showcasePages.map(({ path, section, title }) => ({
    path,
    component: ShowcasePage,
    data: { section, title },
  })),
  { path: '**', redirectTo: 'badge' },
];
