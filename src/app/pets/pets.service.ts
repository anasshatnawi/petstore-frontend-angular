import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SERVER_URL } from '../../lib/constans';
import { Pet } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private apiUrl = SERVER_URL;

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl + 'getPets').pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to fetch pets');
        return throwError(() => err);
      })
    );
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl + 'addPet', pet).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to create pet');
        return throwError(() => err);
      })
    );
  }

  updatePet(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}updatePet/${id}`, pet).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to update pet');
        return throwError(() => err);
      })
    );
  }

  deletePet(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deletePet/${id}`).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to delete pet');
        return throwError(() => err);
      })
    );
  }
}
