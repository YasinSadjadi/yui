import {Component, computed, effect, input} from '@angular/core';
import {BadgeStatus} from "./badge-model";

@Component({
    selector: 'tasker-badge',
    standalone: false,
    templateUrl: './badge.html',
})
export class Badge {
    text = input.required<string>();
    type = input<BadgeStatus>('default');
    icon = input<string>('');
}
