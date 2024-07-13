import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NewsTypeToggleComponent } from '../../components/news-type-toggle/news-type-toggle.component';
import { NewsType } from '../../core/enums/news-type';
import { NewsComponent } from '../../components/news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, NewsTypeToggleComponent, NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected selectedType: NewsType = NewsType.Market;
  protected readonly NewsType = NewsType;

  protected handleTypeChange(value: NewsType): void {
    this.selectedType = value;
  }
}
