import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../i18n';
import {
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
    OnInit,
    output, signal,
    viewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'tasker-input',
    standalone: false,
    templateUrl: './input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: Input,
            multi: true,
        },
    ],
})
export class Input implements ControlValueAccessor, OnInit {
  protected readonly i18n = injectYui(YuiI18n);
    type = input<'text' | 'textarea' | 'date' | 'password'>('text');
    title = input.required<string>();
    id = input<string>();
    placeholder = input<string>('');
    disabled = input<boolean>(false);

    protected disabledState = signal<boolean>(false);
    protected isPasswordVisible = signal<boolean>(false);
    protected isCalendarOpen = signal<boolean>(false);
    protected currentMonth = signal<Date>(startOfMonth(new Date()));
    protected readonly weekdays = computed(() => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(this.i18n.locale(), { weekday: 'short' }).format(new Date(2023, 0, 1 + i))));
    protected readonly monthLabel = computed(() =>
        new Intl.DateTimeFormat(this.i18n.locale(), { month: 'long', year: 'numeric', calendar: 'gregory' }).format(this.currentMonth()),
    );
    protected readonly calendarDays = computed(() => {
        const month = this.currentMonth();
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
        const start = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay.getDay());
        const today = toDateKey(new Date());

        return Array.from({ length: 42 }, (_, index) => {
            const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
            const iso = toDateKey(date);
            return { date, iso, inCurrentMonth: date.getMonth() === month.getMonth(), isToday: iso === today };
        });
    });

    value = input<string | number | null>(null);
    protected inputValue = signal<string | null>(null);
    valueChange = output<string | number | null>();

    private inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

    protected confirmedId = computed<string>(
        () => this.id() ? this.id()! :
            this.title()
                .replace('  ', ' ')
                .replace(' ', '-')
    );

    ngOnInit() {
        this.disabledState.set(this.disabled());
        if (this.value() !== null && this.value() !== undefined) {
            const value = this.value()!.toString();
            this.inputValue.set(value || null);
            if (isDateKey(value)) this.currentMonth.set(startOfMonth(parseDateKey(value)));
        }

    }

    writeValue(obj: any): void {
        const value = obj === null || obj === undefined || obj === '' ? null : String(obj);
        this.inputValue.set(value);
        if (value && isDateKey(value)) this.currentMonth.set(startOfMonth(parseDateKey(value)));
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
        const val = this.inputElement()?.nativeElement.value ?? null;
        this.inputValue.set(val);
        this.valueChange.emit(val);
        this.onChange(val);
        this.onTouch();
    }

    toggleCalendar(): void {
        if (this.disabledState()) return;
        if (!this.isCalendarOpen()) {
            const value = this.inputValue();
            this.currentMonth.set(startOfMonth(value && isDateKey(value) ? parseDateKey(value) : new Date()));
        }
        this.isCalendarOpen.update(open => !open);
    }

    closeCalendar(): void {
        this.isCalendarOpen.set(false);
        this.onTouch();
    }

    changeMonth(amount: number): void {
        const month = this.currentMonth();
        this.currentMonth.set(new Date(month.getFullYear(), month.getMonth() + amount, 1));
    }

    selectDate(value: string): void {
        this.commitDate(value);
    }

    selectToday(): void {
        this.commitDate(toDateKey(new Date()));
    }

    clearDate(): void {
        this.commitDate(null);
    }

    formatDate(value: string): string {
        if (!isDateKey(value)) return value;
        return new Intl.DateTimeFormat(this.i18n.locale(), { dateStyle: 'medium', calendar: 'gregory' }).format(parseDateKey(value));
    }

    private commitDate(value: string | null): void {
        this.inputValue.set(value);
        if (value) this.currentMonth.set(startOfMonth(parseDateKey(value)));
        this.valueChange.emit(value);
        this.onChange(value);
        this.closeCalendar();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (this.isCalendarOpen() && !this.elementRef.nativeElement.contains(event.target)) {
            this.closeCalendar();
        }
    }

    private readonly elementRef = inject(ElementRef<HTMLElement>);

    togglePassword() {
        this.isPasswordVisible.update(v => !v);
    }
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isDateKey(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = parseDateKey(value);
    return !Number.isNaN(date.getTime()) && toDateKey(date) === value;
}

function parseDateKey(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

