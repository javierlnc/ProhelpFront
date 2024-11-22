import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TaskResquest } from '@interfaces/task-requets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _basic_url = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTaskForUser(): Observable<any> {
    return this.http
      .get(`${this._basic_url}/task/all`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  createTask(taskDTO: TaskResquest): Observable<any> {
    return this.http
      .post(`${this._basic_url}/task/create`, taskDTO, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(catchError(this.handleError));
  }
  closeTask(taskId: number): Observable<any> {
    return this.http
      .put(
        `${this._basic_url}/task/${taskId}/close`,
        {},
        {
          headers: this.createAuthorizationHeader(),
        }
      )
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
