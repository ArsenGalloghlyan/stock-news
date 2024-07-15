import { StockSymbolFilterPipe } from './stock-symbol-filter.pipe';
import { StockSymbol } from '../interfaces/symbol';

const mockData: StockSymbol[] = [
  {
    id: 1,
    name: 'AAPL',
  },
  {
    id: 2,
    name: 'MSFT',
  },
  {
    id: 3,
    name: 'GOOGL',
  },
  {
    id: 4,
    name: 'AMZN',
  },
  {
    id: 5,
    name: 'FB',
  },
];

describe('StockSymbolFilterPipe', () => {
  let stockSymbolPipe: StockSymbolFilterPipe;

  beforeEach(() => {
    stockSymbolPipe = new StockSymbolFilterPipe();
  });

  it('should handle single char case', () => {
    expect(stockSymbolPipe.transform(mockData, 'A')).toStrictEqual([
      { id: 1, name: 'AAPL' },
      { id: 4, name: 'AMZN' },
    ]);
  });

  it('should be case insensitive', () => {
    expect(stockSymbolPipe.transform(mockData, 'go')).toStrictEqual([
      { id: 3, name: 'GOOGL' },
    ]);
  });

  it('handle no data found case', () => {
    expect(stockSymbolPipe.transform(mockData, 'SILVER')).toStrictEqual([]);
  });

  it('handle full name search case', () => {
    expect(stockSymbolPipe.transform(mockData, 'AMZN')).toStrictEqual([
      { id: 4, name: 'AMZN' },
    ]);
  });

  it('handle empty string search value case', () => {
    expect(stockSymbolPipe.transform(mockData, '')).toStrictEqual(mockData);
  });

  it('handle empty data case', () => {
    expect(stockSymbolPipe.transform([], 'FB')).toStrictEqual([]);
  });
});
