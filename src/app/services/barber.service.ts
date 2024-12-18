// barber.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private apiUrl = 'https://localhost:7063/api/Barbers';

  constructor(private http: HttpClient) {}

  getAllBarbers(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  addBarber(token: string, barberData: { name: string, experienceLevel: number }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.apiUrl, barberData, { headers });
  }

  deleteBarber(token: string, barberId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const deleteUrl = `${this.apiUrl}/${barberId}`;
    return this.http.delete(deleteUrl, { headers });
  }
}