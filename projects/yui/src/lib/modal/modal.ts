import { inject as injectYui } from '@angular/core';
import { YuiI18n } from '../i18n';
import {
    Component,
    effect,
    inject,
    OnDestroy,
    OnInit,
    signal,
    TemplateRef,
    viewChild,
} from '@angular/core';
import {ModalService} from './modal-service';
import {SubscriptionSink} from '../utils/subscription-sink';
import {ModalData} from './modal-model';

@Component({
    selector: 'tasker-modal',
    standalone: false,
    templateUrl: './modal.html',
})
export class Modal implements OnInit, OnDestroy {
  protected readonly i18n = injectYui(YuiI18n);
    private modalService = inject(ModalService);

    private subs = new SubscriptionSink();

    modalData = signal<ModalData | null>(null);
    show = signal<boolean>(false);

    ngOnInit(): void {
        this.subs.sink = this.modalService.getTemplate().subscribe((data) => {
            this.modalData.set(data);
        });
        this.subs.sink = this.modalService.isModalOpen().subscribe((value) => {
            this.show.set(value);
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
    onModalClose() {
        this.modalService.close();
    }

    onModalCleanup() {
        this.modalService.cleanup();
    }
}
