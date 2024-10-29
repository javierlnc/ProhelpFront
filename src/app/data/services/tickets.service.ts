import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { TicketRequets } from '@interfaces/ticket-requets';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private readonly _basic_url = 'http://localhost:8080/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  creteTicket(tikectDTO: TicketRequets): Observable<any> {
    return this.http.post(`${this._basic_url}api/ticket/create`, tikectDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getTicketsListByUser(): Observable<any> {
    return this.http
      .get(`${this._basic_url}api/ticket/all`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketById(id: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}api/ticket/${id}`, {
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
