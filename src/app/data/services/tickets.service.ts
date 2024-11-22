import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { TicketRequets } from '@interfaces/ticket-requets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private readonly _basic_url = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  creteTicket(tikectDTO: TicketRequets): Observable<any> {
    return this.http.post(`${this._basic_url}api/ticket/create`, tikectDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getTicketsListByUser(): Observable<any> {
    return this.http
      .get(`${this._basic_url}/ticket/all`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketById(id: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}/ticket/${id}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getApprovingTickets(): Observable<any> {
    return this.http
      .get(`${this._basic_url}/ticket/approval`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getTicketApproval(ticketId: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}/ticket/approval/${ticketId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  approvalOrRefue(ticketId: number, status: number): Observable<any> {
    return this.http
      .put(`${this._basic_url}/ticket/${ticketId}/approve-close`, status, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  closeTicket(
    ticketId: number,
    resolutionDescription: string
  ): Observable<any> {
    return this.http
      .put(
        `${this._basic_url}/ticket/${ticketId}/close`,
        resolutionDescription,
        {
          headers: this.createAuthorizationHeader(),
        }
      )
      .pipe(catchError(this.handleError));
  }
  assignTechnicianAndPriority(
    ticketId: number,
    technicianId: number,
    priorityId: number
  ): Observable<any> {
    const body = {
      technicianId: technicianId,
      priorityId: priorityId,
    };
    return this.http
      .put(`${this._basic_url}/ticket/${ticketId}/assign`, body, {
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
