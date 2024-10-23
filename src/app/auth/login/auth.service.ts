import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, tap } from 'rxjs';

export interface AuthResponse {
  jwt: string;
  rol: string;
  username: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const loginData = { username, password };

    return this.http.post<AuthResponse>(`${this._apiUrl}/login`, loginData).pipe(
      tap(response => this.setSession(response)),
      catchError(error => this.handleError(error))
    );
  }

  logout(): void {
    localStorage.clear(); // Elimina todos los elementos de localStorage
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(){
    const user = {
      username: localStorage.getItem('user'),
      rol: localStorage.getItem('role'),
      userId: Number(localStorage.getItem('userId'))
    };

    return user.username ? user : null; // Devuelve el objeto de usuario si el nombre está presente
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.jwt);
    localStorage.setItem('role', authResult.rol);
    localStorage.setItem('userId', authResult.userId.toString());
    localStorage.setItem('user', authResult.username);
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 401) {
      return throwError(() => new Error('Credenciales incorrectas'));
    } else if (error.status === 0) {
      return throwError(() => new Error('No se pudo conectar con el servidor. Verifica tu conexión a Internet.'));
    } else {
      return throwError(() => new Error('Ocurrió un error inesperado.'));
    }
  }
}
