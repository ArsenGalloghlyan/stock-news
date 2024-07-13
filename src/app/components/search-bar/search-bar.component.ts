import { Component, inject, OnInit } from '@angular/core';
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
import { firstValueFrom, Observable } from 'rxjs';
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
export class SearchBarComponent implements OnInit {
  protected inputValue = '';
  private selectedStockSymbol?: StockSymbol;
  protected recentSearchData: Array<RecentSearch> = [];
  protected showDropdown = false;

  private stockSymbolService: StockSymbolService = inject(StockSymbolService);
  protected possibleSymbols$: Observable<Array<StockSymbol>> =
    this.stockSymbolService.getStockSymbols();

  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  ngOnInit() {
    this.initRecentSearchData();
  }

  protected async handleAddSymbol(): Promise<void> {
    if (!this.inputValue) {
      return;
    }

    if (!this.selectedStockSymbol) {
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
      JSON.stringify(recentSearchData.concat([this.selectedStockSymbol])),
    );
    this.initRecentSearchData();
    await this.stockSymbolService.addStockSymbol(this.selectedStockSymbol);
    this.resetValues();
  }

  public handleInputValueChange(value: string): void {
    this.inputValue = value;
  }

  public async handleValueSelect(stockSymbolId: number): Promise<void> {
    const selectedStockSymbol = (
      await firstValueFrom(this.possibleSymbols$)
    ).find((symbol) => symbol.id === stockSymbolId);
    this.selectedStockSymbol = selectedStockSymbol;
    this.inputValue = selectedStockSymbol?.name ?? '';
    this.showDropdown = false;
  }

  private initRecentSearchData(): void {
    this.recentSearchData = JSON.parse(
      this.localStorageService.getItem(RECENT_SEARCH_LC_NAME) || '{}',
    );
  }

  private resetValues(): void {
    this.inputValue = '';
    this.selectedStockSymbol = undefined;
  }
}
