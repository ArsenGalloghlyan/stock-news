import { Component, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { NewsType } from '../../core/enums/news-type';
import { NEWS_TYPES } from '../../core/helpers/constants';

@Component({
  selector: 'app-news-type-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonToggle, MatButtonToggleGroup],
  templateUrl: './news-type-toggle.component.html',
  styleUrl: './news-type-toggle.component.scss',
})
export class NewsTypeToggleComponent {
  handleChange: OutputEmitterRef<NewsType> = output();

  protected readonly newsTypes: Array<{ title: string; value: NewsType }> =
    NEWS_TYPES;
  protected readonly NewsType = NewsType;

  protected handleTypeChange(toggleChange: MatButtonToggleChange): void {
    this.handleChange.emit(toggleChange.value);
  }
}
