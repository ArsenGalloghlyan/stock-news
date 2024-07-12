import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RecentSearch } from '../../core/interfaces/recent-search';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, MatButton, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  showAddSymbolBtn: InputSignal<boolean> = input(false);
  addSymbol: OutputEmitterRef<string> = output();

  protected inputFormControl: FormControl<string | null> = new FormControl('');
  public recentSearchData: Array<RecentSearch> = [];
  protected inputFocused = false;

  protected handleAddSymbol(): void {
    const inputValue = this.inputFormControl.value;
    if (!inputValue) {
      return;
    }
    this.addSymbol.emit(inputValue);
  }
}
