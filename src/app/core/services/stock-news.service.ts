import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { News } from '../interfaces/news';
import { StockSymbolService } from './stock-symbol.service';
import { StockSymbol } from '../interfaces/symbol';

@Injectable({
  providedIn: 'root',
})
export class StockNewsService {
  private http: HttpClient = inject(HttpClient);
  private news$: Observable<News[]> = this.http
    .get<News[]>('assets/json/stock-news.json')
    .pipe(shareReplay(1));
  private stockSymbolService: StockSymbolService = inject(StockSymbolService);

  public getAllNews(): Observable<News[]> {
    return this.news$;
  }

  public getSymbolNews(): Observable<News[]> {
    return this.stockSymbolService.selectedStockSymbol$.pipe(
      switchMap((selectedStockSymbols: StockSymbol[]) =>
        this.news$.pipe(
          map((news) =>
            news.filter((n) => {
              if (!selectedStockSymbols.length) {
                return n.symbol;
              }
              return selectedStockSymbols.some((selectedSymbol) =>
                n.symbol?.includes(selectedSymbol.name),
              );
            }),
          ),
        ),
      ),
    );
  }

  public getArticleById(articleId: number): Observable<News | undefined> {
    return this.news$.pipe(map((news) => news.find((n) => n.id === articleId)));
  }
}
