import { Component } from '@angular/core';
import { map, Observable, tap } from "rxjs";
import { TextItem } from "../model/view";
import { SingleTypesService } from "../apollo/single-types.service";

interface InstructionData {
  head: string;
  text: string;
  head_2: string;
  text_2: string;
  steps_sklenice: TextItem[];
  steps_sitka: TextItem[];
  headSklenice: string;
  headMisky: string;
}

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
})
export class InstructionComponent {

  instruction$: Observable<InstructionData> =
    this.singleTypesService.getInstructionData<InstructionData>()
      .pipe(
        tap(d => console.log('data', d.data)),
        map(d => d.data),
      );

  constructor(
    private singleTypesService: SingleTypesService,
  ) {}
}
