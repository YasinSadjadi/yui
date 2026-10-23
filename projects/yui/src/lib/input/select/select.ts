import {Component, computed, ElementRef, input, OnInit, output, signal, viewChild} from '@angular/core';
import {SelectItem} from './select-item';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'tasker-select',
    standalone: false,
    templateUrl: './select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: Select,
            multi: true,
        },
    ],
})
export class Select implements ControlValueAccessor, OnInit {
    id = input<string>('');
    title = input.required<string>();
    items = input.required<SelectItem[]>();

    disabled = input<boolean>(false);
    protected disabledState = signal<boolean>(false);

    value = input<string | number | null>(null);
    valueChange = output<string | number | null>();

    isOpen = signal<boolean>(false);
    selectedValue = signal<SelectItem | null>(null);

    confirmedId = computed(() =>
        this.id() ? this.id() : this.title().replace('  ', ' ').replace(' ', '-'),
    );

    ngOnInit() {
        this.disabledState.set(this.disabled());
    }

    writeValue(obj: any): void {
        this.valueChange.emit(obj);
        this.selectedValue.set(this.getSelected(obj));
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

    onValueChange() {
    }

    private getSelected(value: any): SelectItem | null {
        if (!value) {
            return null;
        }
        return this.items().find((item) => item.value == value) ?? null;
    }

    toggleDropdown() {
        this.isOpen.update((value) => !value);
    }

    onOptionClick(event: any) {
        if (event.target.hasAttribute('data-value')) {
            const value = event.target.getAttribute('data-value');

            this.valueChange.emit(value);
            this.selectedValue.set(this.getSelected(value));
            this.onChange(value);
            this.onTouch();
        }
    }
}
