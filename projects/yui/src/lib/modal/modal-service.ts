import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalConfig, ModalData} from './modal-model';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private template$ = new BehaviorSubject<ModalData | null>(null);
    private isModalOpen$ = new BehaviorSubject<boolean>(false);

    open(template: TemplateRef<any>, config: ModalConfig | null = null) {
        this.template$.next({...(config ?? {size: 'auto', title: ''}), template});
        this.isModalOpen$.next(true);
    }

    close() {
        this.isModalOpen$.next(false);
    }

    cleanup() {
        this.template$.next(null);
    }

    getTemplate() {
        return this.template$.asObservable();
    }

    isModalOpen() {
        return this.isModalOpen$.asObservable();
    }
}
