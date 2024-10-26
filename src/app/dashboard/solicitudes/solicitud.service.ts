import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@autService';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private readonly _basic_url = 'http://localhost:8080/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  creteTicket(tikectDTO: any): Observable<any> {
    return this.http.post(`${this._basic_url}api/ticket/create`, tikectDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  createAuthorizationHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
