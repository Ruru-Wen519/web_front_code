import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://my-web-page-code.onrender.com';
  private angularAppUrl = 'https://web-front-code.onrender.com'; // 您的 Angular 應用程式 URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders().set('Origin', this.angularAppUrl);
    return this.http.get(`${this.angularAppUrl}/data`, { headers, withCredentials: true });
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Origin', this.angularAppUrl);
    return this.http.post(`${this.angularAppUrl}/data`, data, { headers, withCredentials: true });
  }
}