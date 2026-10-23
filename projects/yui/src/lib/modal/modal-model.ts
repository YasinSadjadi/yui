import { TemplateRef } from '@angular/core';
export interface ModalConfig {
  size: 'sm' | 'md' | 'lg' | 'auto';
  title: string;
}

export interface ModalData extends ModalConfig {
  template: TemplateRef<any>;
}
