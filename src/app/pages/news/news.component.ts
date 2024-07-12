import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '../../core/services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  private newsService: NewsService = inject(NewsService);

  ngOnInit(): void {
    this.newsService.getNews().subscribe((news) => {
      console.log(news);
    });
  }
}
