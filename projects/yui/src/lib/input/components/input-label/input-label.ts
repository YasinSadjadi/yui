import {Component, input} from '@angular/core';

@Component({
    selector: 'tasker-input-label',
    standalone: false,
    templateUrl: './input-label.html',
})
export class InputLabel {
    title = input.required<string>();
    inputId = input.required<string>();

    isDisabled = input<boolean>(false);
}
