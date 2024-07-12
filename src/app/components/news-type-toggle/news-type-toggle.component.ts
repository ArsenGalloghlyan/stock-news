import { Component, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { NewsType } from '../../core/enums/news-type';

@Component({
  selector: 'app-news-type-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggle, MatButtonToggleGroup],
  templateUrl: './news-type-toggle.component.html',
  styleUrl: './news-type-toggle.component.scss',
})
export class NewsTypeToggleComponent {
  handleChange: OutputEmitterRef<NewsType> = output();

  protected readonly newsTypes: Array<{ title: string; value: NewsType }> = [
    { title: 'Market news', value: NewsType.Market },
    { title: 'Symbol news', value: NewsType.Symbol },
  ];
  protected readonly NewsType = NewsType;

  protected handleTypeChange(toggleChange: MatButtonToggleChange): void {
    this.handleChange.emit(toggleChange.value);
  }
}
