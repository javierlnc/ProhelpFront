import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  jwt: string;
  rol: string;
  username: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _basic_url = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const loginData = { username, password };

    return this.http
      .post<AuthResponse>(`${this._basic_url}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          this.setSession(response);
        }),
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = {
      username: localStorage.getItem('user'),
      rol: localStorage.getItem('role'),
      userId: Number(localStorage.getItem('userId')),
    };

    return user;
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.jwt);
    localStorage.setItem('role', authResult.rol);
    localStorage.setItem('userId', authResult.userId.toString());
    localStorage.setItem('user', authResult.username);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Error por defecto.';

    if (error.error && error.message) {
      errorMessage = error.error?.message;
    } else if (error.status === 401) {
      errorMessage = 'Credenciales incorrectas';
    } else if (error.status === 0) {
      errorMessage =
        'No se pudo conectar con el servidor. Verifica tu conexión a Internet.';
    }

    return throwError(() => errorMessage);
  }
}
