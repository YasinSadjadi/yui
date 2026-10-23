import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page';
import { Section } from './section/section';
import { ToolContainer } from './tool-container/tool-container';
import { ToolContainerItem } from './tool-container/tool-container-item/tool-container-item';

@NgModule({
  declarations: [PageComponent, Section, ToolContainer, ToolContainerItem],
  imports: [CommonModule],
  exports: [PageComponent, Section, ToolContainer, ToolContainerItem],
})
export class PageModule {}
