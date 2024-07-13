import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root',
})
export class StockNewsService {
  private http: HttpClient = inject(HttpClient);
  private news$: Observable<News[]> = this.http
    .get<News[]>('assets/json/stock-news.json')
    .pipe(shareReplay(1));

  public getAllNews(): Observable<News[]> {
    return this.news$;
  }

  public getSymbolNews(): Observable<News[]> {
    return this.news$.pipe(map((d) => d.filter((news) => news.symbol)));
  }
}
