import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiListResult } from '../models/api-list-result';

@Injectable()
export class MultiItemViewService {
  private http = inject(HttpClient);

  getItems<T>(url: string, pageNumber: number, pageSize: number, additionalParams?: Record<string, string | number | boolean>) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (additionalParams) {
      for (const [key, value] of Object.entries(additionalParams)) {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }

    return this.http.get<ApiListResult<T>>(url, { params });
  }
}
