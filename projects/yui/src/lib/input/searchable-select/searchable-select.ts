import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../../i18n';
import {
    Component,
    computed,
    ElementRef,
    inject,
    input,
    OnDestroy,
    OnInit,
    output,
    signal,
    viewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from '../select/select-item';
import {InputService} from '../input-service';
import {SubscriptionSink} from '../../utils/subscription-sink';
import {debounceTime, Subject} from 'rxjs';

@Component({
    selector: 'tasker-searchable-select',
    standalone: false,
    templateUrl: './searchable-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SearchableSelect,
            multi: true,
        },
    ],
})
export class SearchableSelect implements ControlValueAccessor, OnInit, OnDestroy {
  protected readonly i18n = injectYui(YuiI18n);

    url = input.required<string>();
    titleField = input.required<string>();
    identifierField = input.required<string>();

    title = input.required<string>();
    id = input<string>('');

    isDisabled = input<boolean>(false);
    protected disabled = signal<boolean>(false);

    selectedValue = signal<any | null>(null);
    selectedValueChange = output<any | null>();

    searchValue = signal<string>('');

    inputString = computed<string>(() => {
        if (this.selectedValue() && this.selectedValue()[this.titleField()]) {
            return this.selectedValue()[this.titleField()]
        } else {
            return this.searchValue();
        }
    });

    items = signal<any[]>([]);
    isLoading = signal<boolean>(false);
    isOpen = signal<boolean>(false);
    searchTermInput = viewChild.required<ElementRef<HTMLInputElement>>('searchTermInput')

    showItems = computed<SelectItem[]>(() => this.items().map((item) => {
        return {title: item[this.titleField()], value: item[this.identifierField()]};
    }))

    confirmedId = computed(() =>
        this.id() ? this.id() : this.title().replace('  ', ' ').replace(' ', '-'),
    );

    private dataService = inject(InputService);
    private subs = new SubscriptionSink();

    private debounceSubject = new Subject<void>();

    ngOnInit() {
        if (!this.selectedValue()) {
            this.onSearch("");
        }

        this.subs.sink = this.debounceSubject.pipe(debounceTime(1000))
            .subscribe(() => this.onSearch(this.searchTermInput().nativeElement.value))

        this.disabled.set(this.isDisabled());
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    writeValue(obj: any): void {
        this.selectedValueChange.emit(this.getSelected(obj));
        this.selectedValue.set(this.getSelected(obj));
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onChange: any = () => {
    };
    onTouch: any = () => {
    };

    private onSearch(searchTerm: string) {
        this.isLoading.set(true);
        this.subs.sink = this.dataService.search(this.url(), searchTerm)
            .subscribe((response) => {
                if (response.succeeded)
                    this.items.set(response.results);
                else
                    console.error("Failed searching for " + searchTerm);

                this.isLoading.set(false);
            });
    }

    onSearchTermChange() {
        this.debounceSubject.next();
        this.isOpen.set(true);
    }

    private getSelected(value: any): any | null {
        if (!value) {
            return null;
        }
        return this.items().find((item) => item[this.identifierField()] == value) ?? null;
    }

    toggleDropdown() {
        this.isOpen.update((value) => !value);
    }

    onOptionClick(event: any) {
        if (event.target.hasAttribute('data-value')) {
            const value = event.target.getAttribute('data-value');

            const object = this.getSelected(value)

            this.searchValue.set(object[this.titleField()] ?? "");
            this.selectedValueChange.emit(object);

            this.selectedValue.set(this.getSelected(object));

            this.onChange(value);
            this.onTouch();
        }
    }
}
