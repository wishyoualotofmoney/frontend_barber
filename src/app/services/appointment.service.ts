import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7063/api/Appointments'; // предположительный эндпоинт

  constructor(private http: HttpClient) {}

  createAppointment(token: string, appointmentData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.apiUrl, appointmentData, { headers });
  }
}
