import { Component, effect, inject, input, InputSignal } from '@angular/core';
import { StockNewsService } from '../../core/services/stock-news.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { AsyncPipe, DatePipe } from '@angular/common';
import { News } from '../../core/interfaces/news';
import { NewsType } from '../../core/enums/news-type';
import { Observable } from 'rxjs';
import { DISPLAYED_COLUMNS } from '../../core/helpers/constants';
import { RouterLink } from '@angular/router';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { StockSymbol } from '../../core/interfaces/symbol';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSortHeader,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    DatePipe,
    AsyncPipe,
    MatSort,
    RouterLink,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  newsType: InputSignal<NewsType> = input.required();

  private stockNewsService: StockNewsService = inject(StockNewsService);
  private stockSymbolService: StockSymbolService = inject(StockSymbolService);
  protected readonly displayedColumns: string[] = DISPLAYED_COLUMNS;
  protected newsSource$?: Observable<News[]>;
  protected selectedStockSymbols$: Observable<StockSymbol[]> =
    this.stockSymbolService.selectedStockSymbol$;

  constructor() {
    effect(() => {
      this.newsSource$ =
        this.newsType() === NewsType.Market
          ? this.stockNewsService.getAllNews()
          : this.stockNewsService.getSymbolNews();
    });
  }

  protected handleStockSymbolDeselect(id: number): void {
    this.stockSymbolService.removeStockSymbol(id);
  }
}
