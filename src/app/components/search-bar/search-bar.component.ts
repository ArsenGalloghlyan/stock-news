import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RecentSearch } from '../../core/interfaces/recent-search';
import { SearchAutocompleteComponent } from '../autocomplete/search-autocomplete.component';
import { StockSymbol } from '../../core/interfaces/symbol';
import { RECENT_SEARCH_LC_NAME } from '../../core/helpers/constants';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StockSymbolFilterPipe } from '../../core/pipes/stock-symbol-filter.pipe';
import { OutsideClickDirective } from '../../core/directives/outside-click.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    SearchAutocompleteComponent,
    AsyncPipe,
    StockSymbolFilterPipe,
    OutsideClickDirective,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  protected inputValue = '';
  protected recentSearchData: Array<RecentSearch> = [];
  protected showDropdown = false;

  private stockSymbolService: StockSymbolService = inject(StockSymbolService);
  protected possibleSymbols$: Observable<Array<StockSymbol>> =
    this.stockSymbolService.getStockSymbols();

  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  protected handleAddSymbol(): void {
    if (!this.inputValue) {
      return;
    }
    const recentSearchDataStr = this.localStorageService.getItem(
      RECENT_SEARCH_LC_NAME,
    );
    let recentSearchData: Array<RecentSearch> = [];
    if (recentSearchDataStr) {
      recentSearchData = JSON.parse(recentSearchDataStr);
    }

    this.localStorageService.setItem(
      RECENT_SEARCH_LC_NAME,
      JSON.stringify(recentSearchData.concat([this.inputValue])),
    );
    // this.addSymbol.emit(this.inputValue);
  }

  public handleInputValueChange(value: string): void {
    console.log(value);
    this.inputValue = value;
  }

  public handleValueSelect(value: string): void {
    this.inputValue = value;
    this.showDropdown = false;
  }
}
