import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-autocomplete.component.html',
  styleUrl: './search-autocomplete.component.scss',
})
export class SearchAutocompleteComponent {
  value: InputSignal<string> = input.required();
  onFocus: OutputEmitterRef<void> = output();
  valueChange: OutputEmitterRef<string> = output();
}
