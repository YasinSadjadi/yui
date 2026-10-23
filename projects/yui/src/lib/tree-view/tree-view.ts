import { Component, input, output, signal } from '@angular/core';
import { TreeViewNode } from './tree-view-node';

@Component({
  selector: 'tasker-tree-view',
  standalone: false,
  templateUrl: './tree-view.html',
  styleUrls: ['./tree-view.css'],
})
export class TreeView {
  items = input<TreeViewNode[]>([]);
  label = input('Navigation');
  selectedId = input<string | null>(null);
  nodeSelected = output<TreeViewNode>();

  readonly expandedIds = signal<ReadonlySet<string>>(new Set());

  toggle(id: string): void {
    const next = new Set(this.expandedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.expandedIds.set(next);
  }
}
