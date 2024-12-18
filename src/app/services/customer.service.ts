import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7063/api/Customers';

  constructor(private http: HttpClient) {}

  getAllCustomers(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  addCustomer(token: string, customerData: { name: string; preferredStyle: string }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.apiUrl, customerData, { headers });
  }

  deleteCustomer(token: string, customerId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete(url, { headers });
  }
}