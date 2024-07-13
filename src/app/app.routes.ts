import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./pages/article/article.component').then(
        (c) => c.ArticleComponent
      ),
  },
];
