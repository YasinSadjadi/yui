import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../i18n';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeViewNode } from './tree-view-node';

@Component({
  selector: 'tasker-tree-view-item',
  standalone: false,
  templateUrl: './tree-view-item.html',
  styleUrls: ['./tree-view.css'],
})
export class TreeViewItemComponent {
  protected readonly i18n = injectYui(YuiI18n);
  node = input.required<TreeViewNode>();
  level = input(1);
  expandedIds = input.required<ReadonlySet<string>>();
  selectedId = input<string | null>(null);
  toggle = output<string>();
  activate = output<TreeViewNode>();

  get hasChildren(): boolean { return (this.node().children?.length ?? 0) > 0; }
  get expanded(): boolean { return this.expandedIds().has(this.node().id); }

  onActivate(): void {
    if (this.node().disabled) return;
    this.activate.emit(this.node());
    if (this.hasChildren && !this.node().routerLink && !this.node().href) this.toggle.emit(this.node().id);
  }
}
