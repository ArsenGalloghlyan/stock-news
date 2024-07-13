import { Pipe, PipeTransform } from '@angular/core';
import { StockSymbol } from '../interfaces/symbol';

@Pipe({
  name: 'stockSymbolFilter',
  standalone: true,
})
export class StockSymbolFilterPipe implements PipeTransform {
  transform(data: StockSymbol[], inputValue: string): StockSymbol[] {
    return data.filter((stockSymbol) =>
      stockSymbol.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
}
