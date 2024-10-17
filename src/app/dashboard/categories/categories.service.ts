import { AuthService } from './../../auth/login/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 private readonly _basic_url = "http://localhost:8080/"
  constructor(private http:HttpClient, private authService:AuthService) { }

  createCategoryDetails(categoryDTO:any): Observable<any>{
    return this.http.post(`${this._basic_url}api/admin/category`, categoryDTO,{
      headers: this.createAuthorizationHeader(),
    }) 

  }
  getAllCategories(pageNumber:number): Observable<any>{
    return this.http.get(`${this._basic_url}api/admin/categories/${pageNumber}`,{
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
    
  }
  private handleError(error: any): Observable<never> {
    // Maneja el error de manera más informativa
    console.error('An error occurred:', error);
    return throwError('Error en el servicio; intenta nuevamente más tarde.');
  }
  
}
