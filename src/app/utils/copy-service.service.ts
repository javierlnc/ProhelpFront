import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopyServiceService {
  private jsonUrl = "/copy.json"

  constructor(private http: HttpClient) { }
  getHerramientasCards(): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(
      map((data: any) => data.herramientas)
    );
  }
}
