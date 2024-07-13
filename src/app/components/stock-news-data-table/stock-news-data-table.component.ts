import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DISPLAYED_COLUMNS } from '../../core/helpers/constants';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { News } from '../../core/interfaces/news';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-news-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatTable,
    MatHeaderCellDef,
    MatRow,
    MatRowDef,
    RouterLink,
    MatHeaderRowDef,
  ],
  templateUrl: './stock-news-data-table.component.html',
  styleUrl: './stock-news-data-table.component.scss',
})
export class StockNewsDataTableComponent {
  newsSource: InputSignal<News[]> = input.required();
  protected readonly displayedColumns: string[] = DISPLAYED_COLUMNS;
}
