import {Component, computed, input, output} from '@angular/core';

@Component({
    selector: 'tasker-button',
    standalone: false,
    templateUrl: './button.html',
    styleUrls: ['./button.css'],
})
export class Button {
    title = input.required<string>();
    icon = input<string>('');
    iconSize = input<'sm' | 'base' | 'lg' | 'xl' | '2xl'>('xl');
    disabled = input<boolean>(false);
    type = input<'submit' | 'reset' | 'primary' | 'special' | 'delete' | 'add'>('primary');
    waiting = input<boolean>(false);

    buttonElementType = computed<'submit' | 'reset' | 'button'>(() => {
        if (this.type() === 'submit') {
            return 'submit';
        } else if (this.type() === 'reset') {
            return 'reset';
        } else {
            return 'button';
        }
    });

    click = output<void>();
}
