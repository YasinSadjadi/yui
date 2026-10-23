import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from './button';
import {Loading} from "../loading/loading";

@NgModule({
  declarations: [Button],
    imports: [CommonModule, Loading],
  exports: [Button],
})
export class ButtonModule {}
