import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, shareReplay } from 'rxjs';
import { StockSymbol } from '../interfaces/symbol';

@Injectable({ providedIn: 'root' })
export class StockSymbolService {
  private http: HttpClient = inject(HttpClient);
  private stockSymbol$: Observable<StockSymbol[]> = this.http
    .get<StockSymbol[]>('assets/json/stock-symbols.json')
    .pipe(shareReplay(1));
  private selectedStockSymbolSub: BehaviorSubject<StockSymbol[]> =
    new BehaviorSubject<StockSymbol[]>([]);
  public selectedStockSymbol$: Observable<StockSymbol[]> =
    this.selectedStockSymbolSub.asObservable();

  public getStockSymbols(): Observable<StockSymbol[]> {
    return this.stockSymbol$;
  }

  public async addStockSymbol(stockSymbol: StockSymbol): Promise<void> {
    const currentValue: StockSymbol[] = await firstValueFrom(
      this.selectedStockSymbolSub,
    );
    if (currentValue.findIndex((val) => val.id === stockSymbol.id) !== -1) {
      return;
    }
    this.selectedStockSymbolSub.next(currentValue.concat(stockSymbol));
  }

  public async removeStockSymbol(stockSymbolId: number): Promise<void> {
    const currentValue: StockSymbol[] = await firstValueFrom(
      this.selectedStockSymbolSub,
    );
    if (currentValue.findIndex((val) => val.id === stockSymbolId) === -1) {
      return;
    }
    this.selectedStockSymbolSub.next(
      currentValue.filter((val) => val.id !== stockSymbolId),
    );
  }
}
