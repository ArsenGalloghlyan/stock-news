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
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  newsType: InputSignal<NewsType> = input.required();

  private newsService: StockNewsService = inject(StockNewsService);
  protected readonly displayedColumns: string[] = [
    'title',
    'description',
    'source',
    'date',
  ];
  protected newsSource$?: Observable<News[]>;

  constructor() {
    effect(() => {
      this.newsSource$ =
        this.newsType() === NewsType.Market
          ? this.newsService.getAllNews()
          : this.newsService.getSymbolNews();
    });
  }
}
