import { Resolution } from '../../modules/resolutions/page/resolutions.component';
import { AuthService } from 'src/app/data/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolutionsService {
  private readonly _basic_url = 'http://localhost:8080/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllResolutions(pageNumber: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}api/admin/resolution/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  createResolution(resolutionDTO: any) {
    return this.http.post(
      `${this._basic_url}api/admin/resolution`,
      resolutionDTO,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
  updateResolution(id: number, resolutionDTO: any): Observable<any> {
    return this.http
      .put(`${this._basic_url}api/admin/resolution/${id}`, resolutionDTO, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  deleteResolution(id: number) {
    return this.http
      .delete(`${this._basic_url}api/admin/resolution/${id}`, {
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
