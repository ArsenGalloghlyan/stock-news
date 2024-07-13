import { Component, effect, inject, input, InputSignal } from '@angular/core';
import { StockNewsService } from '../../core/services/stock-news.service';
import { News } from '../../core/interfaces/news';
import { NewsType } from '../../core/enums/news-type';
import { Observable } from 'rxjs';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { StockSymbol } from '../../core/interfaces/symbol';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { StockNewsDataTableComponent } from '../stock-news-data-table/stock-news-data-table.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatChipSet, AsyncPipe, MatChip, StockNewsDataTableComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  newsType: InputSignal<NewsType> = input.required();

  private stockNewsService: StockNewsService = inject(StockNewsService);
  private stockSymbolService: StockSymbolService = inject(StockSymbolService);
  protected readonly NewsType = NewsType;
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
