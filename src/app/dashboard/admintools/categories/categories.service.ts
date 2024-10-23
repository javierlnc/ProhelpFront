import { AuthService } from '@autService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _basic_url = 'http://localhost:8080/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  createCategoryDetails(categoryDTO: any): Observable<any> {
    return this.http.post(`${this._basic_url}api/admin/category`, categoryDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllCategories(pageNumber: number): Observable<any> {
    return this.http
      .get(`${this._basic_url}api/admin/categories/${pageNumber}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  updateCategory(id: number, categoryDTO: any): Observable<any> {
    return this.http
      .put(`${this._basic_url}api/admin/categories/${id}`, categoryDTO, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  deleteCategory(id: number) {
    return this.http
      .delete(`${this._basic_url}api/admin/categories/${id}`, {
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
    // Maneja el error de manera más informativa
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Error en el servicio; intenta nuevamente más tarde.')
    );
  }
}
