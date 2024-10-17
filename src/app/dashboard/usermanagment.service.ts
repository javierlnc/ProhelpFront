import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@autService';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagmentService {

  private readonly _basic_url = "http://localhost:8080/"
  constructor(private http:HttpClient, private authService:AuthService) { }
  getAllUsers(pageNumber:number): Observable<any>{
    return this.http.get(`${this._basic_url}api/admin/users/${pageNumber}`,{
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }
  createAuthorizationHeader(){
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
  }private handleError(error: any): Observable<never> {
    // Maneja el error de manera más informativa
    console.error('An error occurred:', error);
    return throwError(() => new Error('Error en el servicio; intenta nuevamente más tarde.'));
  }

}
