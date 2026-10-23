import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalForm} from "./modal-form/modal-form";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "../button/button-module";


@NgModule({
    declarations: [ModalForm],
    exports: [ModalForm],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule
    ]
})
export class TaskerFormsModule {
}
