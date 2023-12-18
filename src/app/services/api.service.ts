import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get(`${this.SERVER_URL}/product/all`);
  }
}
