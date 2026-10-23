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
import {InputService} from '../input-service';
import {SubscriptionSink} from '../../utils/subscription-sink';
import {debounceTime, Subject} from 'rxjs';

@Component({
    selector: 'tasker-multi-searchable-select',
    standalone: false,
    templateUrl: './searchable-multi-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SearchableMultiSelect,
            multi: true,
        },
    ],
})
export class SearchableMultiSelect implements ControlValueAccessor, OnInit, OnDestroy {

    url = input.required<string>();
    titleField = input.required<string>();
    identifierField = input.required<string>();
    title = input.required<string>();
    inputId = input<string>('');
    inputWidth = input<number | '*'>('*');

    disabled = input<boolean>(false);
    protected disabledState = signal<boolean>(false);

    selectedValues = signal<any[]>([]);
    selectedValueChange = output<any[]>();

    searchValue = signal<string>('');

    displayString = computed<string>(() => {
        const count = this.selectedValues().length;
        if (count === 0) return 'Select items...';

        return `${count} item${count > 1 ? 's' : ''} selected`;
    });
    protected items = signal<any[]>([]);
    showSelectOptions = computed(() => this.items().filter((item) => {
        const isSelected = this.selectedValues().some(selected =>
            selected[this.identifierField()] === item[this.identifierField()]
        );
        return !isSelected;
    }));
    protected isLoading = signal<boolean>(false);
    protected isOpen = signal<boolean>(false);
    protected confirmedId = computed(() =>
        this.inputId() ? this.inputId() : this.title().replace('  ', ' ').replace(' ', '-'),
    );

    protected showItems = computed(() =>
        this.items()
            .filter((item) => !this.selectedValues()
                .some(selected => selected[this.identifierField()] === item[this.identifierField()])
            )
            .map((item) => {
                return {title: item[this.titleField()], value: item[this.identifierField()]};
            })
    );

    private searchTermInput = viewChild.required<ElementRef<HTMLInputElement>>('searchTermInput')
    private dataService = inject(InputService);
    private subs = new SubscriptionSink();

    private debounceSubject = new Subject<void>();

    ngOnInit() {
        if (this.selectedValues()) {
            this.onSearch("");
        }
        this.subs.sink = this.debounceSubject.pipe(debounceTime(1000))
            .subscribe(() => this.onSearch(this.searchTermInput().nativeElement.value));

        this.disabledState.set(this.disabled());
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    writeValue(obj: any): void {
        if (Array.isArray(obj)) {
            this.selectedValues.set([...obj]);
        } else if (obj) {
            const arr = Array.isArray(obj) ? obj : [obj];
            this.selectedValues.set(arr);
        } else {
            this.selectedValues.set([]);
        }

        this.selectedValueChange.emit(this.selectedValues());
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabledState.set(isDisabled);
    }

    onChange: any = () => {
    };
    onTouch: any = () => {
    };

    onSearchTermChange() {
        this.debounceSubject.next();
        this.isOpen.set(true);
    }

    toggleDropdown() {
        this.isOpen.update((value) => !value);
    }

    onOptionClick(event: any) {
        if (event.target.hasAttribute('data-value')) {
            const value = event.target.getAttribute('data-value');

            const object = this.getSelectedObject(value);
            if (!object) return;

            const isSelected = this.selectedValues().some(item =>
                item[this.identifierField()] === value
            );

            if (isSelected) {
                const newSelection = this.selectedValues().filter(item =>
                    item[this.identifierField()] !== value
                );
                this.selectedValues.set(newSelection);

                this.onChange(value);
            } else {
                const newSelection = [...this.selectedValues(), object];
                this.selectedValues.set(newSelection);

                this.onChange(value);
            }

            this.selectedValueChange.emit(this.selectedValues());
            this.onTouch();

            this.isOpen.set(false);
        }
    }

    protected onSelectedDelete(identifier: any) {
        console.log(identifier);
        this.selectedValues.update((value) => value.filter((item) => item[this.identifierField()] !== identifier));
        this.selectedValueChange.emit(this.selectedValues());
    }

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

    private getSelectedObject(value: any): any | null {
        return this.items().find((item) => item[this.identifierField()] == value) ?? null;
    }
}
