import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../../i18n';
import {Component, input, output} from '@angular/core';
@Component({
    selector: 'tasker-modal-form',
    standalone: false,
    templateUrl: './modal-form.html',
})
export class ModalForm {
  protected readonly i18n = injectYui(YuiI18n);
    reset = output();
    isWaiting = input<boolean>(false);
}
