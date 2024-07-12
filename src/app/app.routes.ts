import { Route } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./pages/article/article.component').then(
        (c) => c.ArticleComponent
      ),
  },
];
