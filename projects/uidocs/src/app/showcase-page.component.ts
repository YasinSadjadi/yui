import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BadgeModule,
  ButtonModule,
  GridView,
  InputModule,
  Loading,
  ModalService,
  MultiItemViewModule,
  NotificationService,
  PageModule,
  SelectItem,
  TaskerFormsModule,
  TimelineItem,
  TimelineModule,
  TreeViewModule,
  TreeViewNode,
} from 'yui';

@Component({
  selector: 'app-showcase-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    InputModule,
    Loading,
    MultiItemViewModule,
    PageModule,
    TaskerFormsModule,
    TimelineModule,
    TreeViewModule,
  ],
  template: `
    <header class="mb-8 border-b border-skin-darker pb-5">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Component docs</p>
      <h1 class="text-3xl font-bold">{{ title() }}</h1>
      <p class="mt-2 text-semi-dark">A live example from the yui component library.</p>
    </header>

    @switch (section()) {
      @case ('badge') {
        <section class="space-y-5">
          <h2 class="text-lg font-semibold">Badge status</h2>
          <div class="flex flex-wrap gap-3">
            <tasker-badge text="Default" type="default" icon="bx-info-circle" />
            <tasker-badge text="Added" type="add" icon="bx-check" />
            <tasker-badge text="Needs attention" type="low-attention" icon="bx-bell" />
            <tasker-badge text="Warning" type="warning" icon="bx-error" />
            <tasker-badge text="Danger" type="danger" icon="bx-x-circle" />
          </div>
        </section>
      }
      @case ('button') {
        <section class="space-y-5">
          <h2 class="text-lg font-semibold">Button variants</h2>
          <div class="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            <tasker-button title="Primary" type="primary" icon="bx-star" />
            <tasker-button title="Submit" type="submit" icon="bx-check" />
            <tasker-button title="Reset" type="reset" icon="bx-reset" />
            <tasker-button title="Delete" type="delete" icon="bx-trash" />
            <tasker-button title="Add new" type="add" icon="bx-plus" />
            <tasker-button title="Waiting" type="primary" [waiting]="true" />
          </div>
        </section>
      }
      @case ('modal-form') {
        <section class="max-w-xl rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-4 text-lg font-semibold">Modal form</h2>
          <tasker-modal-form [formGroup]="sampleForm" (reset)="resetForm()">
            <tasker-input title="Task title" placeholder="Write a title" formControlName="title" />
            <tasker-select title="Priority" [items]="priorityItems" formControlName="priority" />
          </tasker-modal-form>
          <p class="mt-3 text-sm text-semi-dark">Form value: {{ sampleForm.value | json }}</p>
        </section>
      }
      @case ('input') {
        <section class="grid max-w-2xl gap-6 rounded-xl border border-skin-darker bg-skin p-5 md:grid-cols-2">
          <tasker-input title="Text" placeholder="Enter a name" [formControl]="nameControl" />
          <tasker-input title="Password" type="password" placeholder="Enter a password" [formControl]="passwordControl" />
          <tasker-input title="Notes" type="textarea" placeholder="Add a note" [formControl]="notesControl" />
          <tasker-input title="Due date" type="date" [formControl]="dateControl" />
        </section>
      }
      @case ('select') {
        <section class="max-w-lg rounded-xl border border-skin-darker bg-skin p-5">
          <tasker-select title="Priority" [items]="priorityItems" [formControl]="priorityControl" />
          <p class="mt-5 text-sm text-semi-dark">Selected value: {{ priorityControl.value }}</p>
        </section>
      }
      @case ('searchable-select') {
        <section class="max-w-lg rounded-xl border border-skin-darker bg-skin p-5">
          <tasker-searchable-select
            title="Assignee"
            url="/api/people"
            titleField="name"
            identifierField="id"
            [formControl]="assigneeControl"
          />
          <p class="mt-5 text-sm text-semi-dark">Search the sample people list and choose one result.</p>
        </section>
      }
      @case ('multi-searchable-select') {
        <section class="max-w-lg rounded-xl border border-skin-darker bg-skin p-5">
          <tasker-multi-searchable-select
            title="Reviewers"
            url="/api/people"
            titleField="name"
            identifierField="id"
            [formControl]="reviewersControl"
          />
          <p class="mt-5 text-sm text-semi-dark">Choose several people; selected chips can be removed individually.</p>
        </section>
      }
      @case ('loading') {
        <section class="max-w-3xl">
          <p class="mb-4 text-sm text-semi-dark">Small, unobtrusive indicators for buttons and async content.</p>
          <div class="grid gap-4 sm:grid-cols-3">
            <article class="rounded-xl border border-skin-darker bg-skin p-4 shadow-sm">
              <p class="text-sm font-semibold text-dark">Spinner</p>
              <p class="mt-1 text-xs text-semi-dark">Compact circular progress</p>
              <div class="mt-5 flex h-12 items-center justify-center rounded-lg bg-skin-dark/50 text-accent">
                <tasker-loading size="md" type="simple" />
              </div>
            </article>
            <article class="rounded-xl border border-skin-darker bg-skin p-4 shadow-sm">
              <p class="text-sm font-semibold text-dark">Dots</p>
              <p class="mt-1 text-xs text-semi-dark">Subtle horizontal motion</p>
              <div class="mt-5 flex h-12 items-center justify-center rounded-lg bg-skin-dark/50 text-accent">
                <tasker-loading size="md" type="horizontal" />
              </div>
            </article>
            <article class="rounded-xl border border-skin-darker bg-skin p-4 shadow-sm">
              <p class="text-sm font-semibold text-dark">Bars</p>
              <p class="mt-1 text-xs text-semi-dark">Vertical pulse</p>
              <div class="mt-5 flex h-12 items-center justify-center rounded-lg bg-skin-dark/50 text-accent">
                <tasker-loading size="md" type="vertical" />
              </div>
            </article>
          </div>
        </section>
      }
      @case ('modal') {
        <section class="max-w-xl rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-3 text-lg font-semibold">Template modal</h2>
          <p class="mb-5 text-sm text-semi-dark">Open a modal with a title and projected template content.</p>
          <tasker-button title="Open modal" icon="bx-window-open" (click)="openModal(modalContent)" />
          <ng-template #modalContent>
            <div class="min-w-72 space-y-3 p-3">
              <p>This content is rendered from the page template.</p>
              <tasker-input title="Your name" placeholder="Ada Lovelace" />
            </div>
          </ng-template>
        </section>
      }
      @case ('grid') {
        <section class="rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-4 text-lg font-semibold">Pageable grid</h2>
          <tasker-grid-view url="/api/tasks" [haveAddButton]="true" (rowClicked)="selectedRow.set($event)" />
          @if (selectedRow()) { <p class="mt-4 text-sm text-semi-dark">Selected row: {{ selectedRow() | json }}</p> }
        </section>
      }
      @case ('notification') {
        <section class="max-w-xl rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-3 text-lg font-semibold">Notification types</h2>
          <p class="mb-5 text-sm text-semi-dark">Notifications appear in the upper right. Each one can be dismissed.</p>
          <div class="flex flex-wrap gap-3">
            <tasker-button title="Success" type="add" (click)="notify('success')" />
            <tasker-button title="Info" type="primary" (click)="notify('info')" />
            <tasker-button title="Warning" type="reset" (click)="notify('warning')" />
            <tasker-button title="Error" type="delete" (click)="notify('error')" />
          </div>
        </section>
      }
      @case ('page') {
        <section class="max-w-4xl rounded-xl border border-skin-darker bg-skin p-4">
          <tasker-page>
            <div class="min-h-72 rounded-lg border border-dashed border-skin-darker p-6">Page content is projected here.</div>
          </tasker-page>
        </section>
      }
      @case ('section') {
        <section class="max-w-2xl rounded-xl border border-skin-darker bg-skin p-8">
          <tasker-section title="Overview"><p class="pt-3">Section content is projected into the bordered area.</p></tasker-section>
        </section>
      }
      @case ('tool-container') {
        <section class="max-w-3xl rounded-xl border border-skin-darker bg-skin p-5">
          <tasker-tool-container><span class="rounded-md px-3 py-2">A projected toolbar action</span></tasker-tool-container>
        </section>
      }
      @case ('tool-container-item') {
        <section class="max-w-3xl rounded-xl border border-skin-darker bg-skin p-5">
          <tasker-tool-container>
            <tasker-tool-container-item title="Edit task" icon="bx-edit" />
          </tasker-tool-container>
          <p class="mt-4 text-sm text-semi-dark">This action item is designed to be placed inside a tool container.</p>
        </section>
      }
      @case ('timeline') {
        <section class="max-w-2xl rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-5 text-lg font-semibold">Project milestones</h2>
          <tasker-timeline [items]="timelineItems" />
        </section>
      }
      @case ('tree-view') {
        <section class="max-w-sm rounded-xl border border-skin-darker bg-skin p-5">
          <h2 class="mb-4 text-lg font-semibold">Navigation tree</h2>
          <tasker-tree-view label="Project navigation" [items]="treeItems" [selectedId]="selectedTreeNode()?.id ?? null" (nodeSelected)="selectedTreeNode.set($event)" />
          @if (selectedTreeNode(); as selected) {
            <p class="mt-4 border-t border-skin-darker pt-3 text-sm text-semi-dark">Selected: {{ selected.label }}</p>
          }
        </section>
        <p class="mt-4 max-w-xl text-sm text-semi-dark">Expand folders to browse nested items. Items with an Angular route or URL navigate when selected; other items emit <code>nodeSelected</code>.</p>
      }
    }
  `,
})
export class ShowcasePage {
  private readonly route = inject(ActivatedRoute);
  private readonly routeData = toSignal(this.route.data, { initialValue: {} as Data });
  private readonly modalService = inject(ModalService);
  private readonly notificationService = inject(NotificationService);

  readonly section = computed(() => String(this.routeData()['section'] ?? 'badge'));
  readonly title = computed(() => String(this.routeData()['title'] ?? 'Badge'));
  readonly selectedRow = signal<unknown>(null);
  readonly selectedTreeNode = signal<TreeViewNode | null>(null);

  readonly priorityItems: SelectItem[] = [
    { title: 'Low', value: 1 },
    { title: 'Normal', value: 2 },
    { title: 'High', value: 3 },
  ];

  readonly sampleForm = new FormGroup({
    title: new FormControl('Prepare release notes'),
    priority: new FormControl(2),
  });
  readonly nameControl = new FormControl('Ada Lovelace');
  readonly passwordControl = new FormControl('sample-password');
  readonly notesControl = new FormControl('These controls work with Angular reactive forms.');
  readonly dateControl = new FormControl('2026-09-30');
  readonly priorityControl = new FormControl(3);
  readonly assigneeControl = new FormControl(1);
  readonly reviewersControl = new FormControl([peopleReviewer()]);
  readonly timelineItems: TimelineItem[] = [
    {
      title: 'Create project',
      description: 'The initial scope and team are in place.',
      date: 'Sep 18',
      status: 'complete',
    },
    {
      title: 'Build the component library',
      description: 'Core components are ready for review.',
      date: 'Sep 24',
      status: 'current',
    },
    {
      title: 'Publish documentation',
      description: 'Prepare the examples and package notes.',
      date: 'Upcoming',
      status: 'upcoming',
    },
  ];
  readonly treeItems: TreeViewNode[] = [
    { id: 'workspace', label: 'Workspace', icon: 'bx-folder', children: [
      { id: 'projects', label: 'Projects', icon: 'bx-folder-open', children: [
        { id: 'design-system', label: 'Design system', icon: 'bx-palette', routerLink: '/button' },
        { id: 'roadmap', label: 'Roadmap', icon: 'bx-list-check', routerLink: '/timeline' },
      ] },
      { id: 'team', label: 'Team', icon: 'bx-group', href: 'https://angular.dev' },
      { id: 'archive', label: 'Archive', icon: 'bx-archive', disabled: true },
    ] },
    { id: 'settings', label: 'Settings', icon: 'bx-cog', routerLink: '/page-layout' },
  ];

  resetForm(): void {
    this.sampleForm.reset({ title: '', priority: null });
  }

  openModal(template: Parameters<ModalService['open']>[0]): void {
    this.modalService.open(template, { size: 'md', title: 'Modal example' });
  }

  notify(type: 'success' | 'info' | 'warning' | 'error'): void {
    this.notificationService.show(`This is a ${type} notification.`, type);
  }
}

function peopleReviewer() {
  return { id: 2, name: 'Grace Hopper', role: 'Admiral' };
}
