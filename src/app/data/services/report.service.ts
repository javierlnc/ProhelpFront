import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly _basic_url = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  generateReport(requestDTO: any): Observable<any> {
    return this.http
      .post(`${this._basic_url}/admin/report`, requestDTO, {
        headers: this.createAuthorizationHeader(),
        responseType: 'blob' as 'json',
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
