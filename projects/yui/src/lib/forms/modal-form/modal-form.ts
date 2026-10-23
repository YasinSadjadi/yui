import {Component, input, output} from '@angular/core';
@Component({
    selector: 'tasker-modal-form',
    standalone: false,
    templateUrl: './modal-form.html',
})
export class ModalForm {
    reset = output();
    isWaiting = input<boolean>(false);
}
