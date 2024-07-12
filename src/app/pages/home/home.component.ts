import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NewsTypeToggleComponent } from '../../components/news-type-toggle/news-type-toggle.component';
import { NewsType } from '../../core/enums/news-type';
import { RECENT_SEARCH_LC_NAME } from '../../core/helpers/constants';
import { RecentSearch } from '../../core/interfaces/recent-search';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, NewsTypeToggleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected selectedType?: NewsType;
  protected readonly NewsType = NewsType;
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  protected handleTypeChange(value: NewsType): void {
    console.log(value);
    this.selectedType = value;
  }

  protected handleAddSymbol(value: string): void {
    const recentSearchDataStr = this.localStorageService.getItem(
      RECENT_SEARCH_LC_NAME
    );
    let recentSearchData: Array<RecentSearch> = [];
    if (recentSearchDataStr) {
      recentSearchData = JSON.parse(recentSearchDataStr);
    }

    this.localStorageService.setItem(
      RECENT_SEARCH_LC_NAME,
      JSON.stringify(recentSearchData.concat([value]))
    );
  }
}
