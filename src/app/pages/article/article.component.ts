import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StockNewsService } from '../../core/services/stock-news.service';
import { Observable } from 'rxjs';
import { News } from '../../core/interfaces/news';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private stockNewsService: StockNewsService = inject(StockNewsService);
  protected articleId = this.route.snapshot.params['id'];
  protected article$: Observable<News | undefined> =
    this.stockNewsService.getArticleById(+this.articleId);
}
