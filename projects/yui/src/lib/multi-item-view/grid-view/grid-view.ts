import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../../i18n';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  TemplateRef,
  untracked,
} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {MultiItemViewService} from '../multi-item-view-service';
import {SelectItem} from '../../input/select/select-item';
import {RefreshableGridView} from './grid-view-model';

@Component({
  selector: 'tasker-grid-view',
  standalone: false,
  templateUrl: './grid-view.html',
  providers: [TitleCasePipe],
})
export class GridView implements OnInit, OnDestroy, RefreshableGridView {
  protected readonly i18n = injectYui(YuiI18n);
  url = input<string>('');
  items = input<any[]>([]);
  additionalUrlParams = input<any>({});
  excludedFields = input<string[]>(['id']);
  additionalColumnTemplates = input<TemplateRef<{ $implicit: any }>[]>([]);
  title = input<string>('');
  forceCenter = input<boolean>(false);
  haveAddButton = input<boolean>(false);

  pageChange = output<number>();
  rowDblClicked = output<any>();
  rowClicked = output<any>();
  addButtonClick = output();

  pageNumber = signal<number>(1);
  pageSize = signal<number>(5);
  showItems = signal<any[]>([]);
  totalCount = signal<number>(0);
  totalPages = signal<number>(0);
  isLoading = signal<boolean>(false);
  loadError = signal<boolean>(false);

  rangeStart = computed<number>(() =>
    this.totalCount() === 0 ? 0 : (this.pageNumber() - 1) * this.pageSize() + 1,
  );
  rangeEnd = computed<number>(() =>
    Math.min(this.pageNumber() * this.pageSize(), this.totalCount()),
  );

  isPageable = computed<boolean>(() => this.url().length > 0);

  isFirstPage = computed<boolean>(() => this.pageNumber() <= 1);

  isLastPage = computed<boolean>(() => {
    if (this.totalPages() <= 0) return true;
    return this.pageNumber() >= this.totalPages();
  });

  visibleFields = computed<string[]>(() => {
    const items = this.showItems();
    if (items && items.length > 0) {
      return Object.keys(items[0]).filter(
        (key) => !this.excludedFields().includes(key),
      );
    }
    return [];
  });

  columnWidth(index: number): number {
    const fieldCount = this.visibleFields().length;
    const dataWidth = this.additionalColumnTemplates().length > 0 ? 86 : 100;

    if (fieldCount <= 1) return dataWidth;

    const firstColumnWidth =
      fieldCount === 2 ? dataWidth * 0.56 : fieldCount === 3 ? dataWidth * 0.46 : dataWidth * 0.38;

    return index === 0
      ? firstColumnWidth
      : (dataWidth - firstColumnWidth) / (fieldCount - 1);
  }

  pageSizeItems = signal<SelectItem[]>([
    {title: 5, value: 5},
    {title: 10, value: 10},
    {title: 20, value: 20},
    {title: 30, value: 30},
  ]);

  private pageRequest?: Subscription;
  private dataService = inject(MultiItemViewService);

  constructor() {
    effect(() => {
      const url = this.url();
      this.additionalUrlParams();
      if (url.length > 0) {
        untracked(() => this.loadPage());
      }
    });
  }

  public refresh() {
    this.loadPage();
  }

  private loadPage() {
    if (this.url()) {
      this.pageRequest?.unsubscribe();
      this.isLoading.set(true);
      this.loadError.set(false);
      this.pageRequest = this.dataService
        .getItems(this.url(), this.pageNumber(), this.pageSize(), this.additionalUrlParams())
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            if (response.succeeded) {
              const results = response.results ?? [];
              const totalPages = Math.ceil(response.totalCount / this.pageSize());
              const isUnpagedResponse = results.length > this.pageSize();
              const start = (this.pageNumber() - 1) * this.pageSize();

              this.showItems.set(
                isUnpagedResponse
                  ? results.slice(start, start + this.pageSize())
                  : results,
              );
              this.totalCount.set(response.totalCount);
              this.totalPages.set(Math.max(response.totalPages, totalPages));
            } else {
              this.loadError.set(true);
              this.showItems.set([]);
              this.totalCount.set(0);
              this.totalPages.set(0);
            }
          },
          error: (error) => {
            console.error('Grid view request failed', error);
            this.isLoading.set(false);
            this.loadError.set(true);
            this.showItems.set([]);
            this.totalCount.set(0);
            this.totalPages.set(0);
          },
        });
    } else {
      // Static items mode (no server pagination)
      const staticItems = this.items();
      this.showItems.set(staticItems);
      this.totalCount.set(staticItems.length);
      this.totalPages.set(1);
    }
  }

  onNextPage() {
    if (this.isLastPage()) return;
    this.pageNumber.update((p) => p + 1);
    this.loadPage();
    this.pageChange.emit(this.pageNumber());
  }

  onPrevPage() {
    if (this.isFirstPage()) return;
    this.pageNumber.update((p) => p - 1);
    this.loadPage();
    this.pageChange.emit(this.pageNumber());
  }

  ngOnInit(): void {
    // Initial load for static items (non-pageable mode)
    if (!this.isPageable()) {
      this.loadPage();
    }
  }

  ngOnDestroy(): void {
    this.pageRequest?.unsubscribe();
  }

  onRowDoubleClicked(item: any) {
    this.rowDblClicked.emit(item);
  }

  onRowClicked(item: any) {
    this.rowClicked.emit(item);
  }

  onAddButtonClicked() {
    this.addButtonClick.emit();
  }
  
  protected onPageSizeChanged(value: string | number | null) {
    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
    if (parsed !== null && !isNaN(parsed)) {
      this.pageNumber.set(1);
      this.pageSize.set(parsed);
      this.loadPage();
    }
  }
}
