import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http: HttpClient = inject(HttpClient);

  public getNews(): Observable<News[]> {
    return this.http.get<News[]>('assets/json/data.json');
  }
}
