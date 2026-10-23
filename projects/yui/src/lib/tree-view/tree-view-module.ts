import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeViewItemComponent } from './tree-view-item';
import { TreeView } from './tree-view';

@NgModule({
  declarations: [TreeView, TreeViewItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [TreeView],
})
export class TreeViewModule {}
