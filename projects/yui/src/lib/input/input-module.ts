import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Input} from './input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Select} from './select/select';
import {SearchableSelect} from './searchable-select/searchable-select';
import {InputService} from './input-service';
import {SearchableMultiSelect} from "./searchable-multi-select/searchable-multi-select";
import {InputLabel} from "./components/input-label/input-label";
import {Loading} from "../loading/loading";
import {SelectedItem} from "./searchable-multi-select/components/selected-item/selected-item";


@NgModule({
    declarations: [Input, Select, SearchableSelect, SearchableMultiSelect, InputLabel, SelectedItem],
    exports: [
        Input,
        Select,
        SearchableSelect,
        SearchableMultiSelect
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Loading
    ],
    providers: [InputService]
})
export class InputModule {
}
