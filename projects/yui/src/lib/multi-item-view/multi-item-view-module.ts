import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { GridView } from './grid-view/grid-view';
import { ButtonModule } from '../button/button-module';
import { PageModule } from '../page/page-module';
import { MultiItemViewService } from './multi-item-view-service';
import { InputModule } from '../input/input-module';
import { Loading } from '../loading/loading';

@NgModule({
  declarations: [GridView],
  imports: [CommonModule, ButtonModule, DatePipe, TitleCasePipe, PageModule, InputModule, Loading],
  providers: [MultiItemViewService],
  exports: [GridView],
})
export class MultiItemViewModule {}
