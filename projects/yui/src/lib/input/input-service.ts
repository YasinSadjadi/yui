import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiListResult} from '../models/api-list-result';

@Injectable()
export class InputService {
  private http = inject(HttpClient);

  search(url: string, searchTerm: string, pageNumber: number = 1, pageSize: number = 5) {
    const params = {
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    return this.http.get<ApiListResult<any>>(url, {params: params})
  }
}
