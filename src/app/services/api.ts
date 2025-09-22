import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Creation } from '../models/creation.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Angular "inietta" il singleton di HttpClient nel nostro servizio
  constructor(private http: HttpClient) {}

  // Questo metodo restituisce un "Observable" che emetterà un array di Creation
  getCreations(): Observable<Creation[]> {
    return this.http.get<Creation[]>(`${this.apiUrl}/creations`);
  }

  createCreation(creationData: {
    name: string;
    author: string;
    params: any;
  }): Observable<Creation> {
    return this.http.post<Creation>(`${this.apiUrl}/creations`, creationData);
  }

  deleteCreation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/creations/${id}`);
  }

  updateCreation(id: number, creationData: any): Observable<Creation> {
    return this.http.put<Creation>(`${this.apiUrl}/creations/${id}`, creationData);
  }
}
