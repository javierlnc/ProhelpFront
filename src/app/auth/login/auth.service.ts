import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs';
export interface AuthResponse {
  jwt: string;
  rol: string;
  userId: number;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _apiUrl = 'http://localhost:8080/api/auth';
  

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponse>{
    const loginData = {
      username,
      password
    };
    return this.http.post<AuthResponse>(`${this._apiUrl}/login`,loginData)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt)
        localStorage.setItem('role', response.rol);
        localStorage.setItem('userId', response.userId.toString());
      }),
      catchError((error) => {
        if (error.status === 401) {
          return throwError(() => new Error('Credenciales incorrectas'));
        } else if (error.status === 0) {
          return throwError(() => new Error('No se pudo conectar con el servidor. Verifica tu conexión a Internet.'));
        } else {
          return throwError(() => new Error('Ocurrió un error inesperado.'));
        }
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
   isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
