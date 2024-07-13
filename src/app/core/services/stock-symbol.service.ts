import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { StockSymbol } from '../interfaces/symbol';

@Injectable({ providedIn: 'root' })
export class StockSymbolService {
  private http: HttpClient = inject(HttpClient);
  private stockSymbol$: Observable<StockSymbol[]> = this.http
    .get<StockSymbol[]>('assets/json/stock-symbols.json')
    .pipe(shareReplay(1));

  public getStockSymbols(): Observable<StockSymbol[]> {
    return this.stockSymbol$;
  }
}
