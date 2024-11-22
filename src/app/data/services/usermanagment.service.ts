import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface AreaDTO {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsermanagmentService {
  private readonly _basic_url = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}
  createUserDetails(userDTO: any): Observable<any> {
    return this.http.post(`${this._basic_url}api/admin/user`, userDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllAreas(): Observable<AreaDTO[]> {
    return this.http.get<AreaDTO[]>(`${this._basic_url}/admin/areas`);
  }
  getAllUsers(pageNumber: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}/admin/users/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  getUsersFilter(): Observable<any> {
    return this.http
      .get(`${this._basic_url}/admin/users/filtered`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  updateUser(id: number, userDTO: any): Observable<any> {
    return this.http
      .put(`${this._basic_url}/admin/users/${id}`, userDTO, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  deleteUser(id: number) {
    return this.http
      .delete(`${this._basic_url}/admin/users/${id}`, {
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
