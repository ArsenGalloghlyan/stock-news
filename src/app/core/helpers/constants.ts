import { NewsType } from '../enums/news-type';

export const RECENT_SEARCH_PROP_NAME = 'recent-searches';
export const DISPLAYED_COLUMNS = [
  'title',
  'description',
  'source',
  'symbol',
  'date',
];
export const NEWS_TYPES = [
  { title: 'Market news', value: NewsType.Market },
  { title: 'Symbol news', value: NewsType.Symbol },
];
