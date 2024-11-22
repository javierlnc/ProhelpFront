import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private readonly _basic_url = environment.apiUrl;
  constructor(private htttp: HttpClient, private authService: AuthService) {}

  getListCategories() {
    return this.htttp
      .get(`${this._basic_url}/tec/categories/ticket-count`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketsList() {
    return this.htttp
      .get(`${this._basic_url}/tec/technicians/ticket-count`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketsUser(userId: number) {
    return this.htttp
      .get(`${this._basic_url}/tec/technicians/ticket-count/${userId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketsOverdue(): Observable<any> {
    return this.htttp
      .get(`${this._basic_url}/tec/tickets/overdue`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
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
