import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SERVER_URL } from '../../lib/constans';
import { User } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = SERVER_URL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'getUsers').pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'addUser', user).pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}updateUser/${id}`, user).pipe(
      catchError((err) => {
        alert(err?.error?.message || 'Failed to update user');
        return throwError(() => err);
      })
    );
  }

  deleteUser(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deleteUser/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => error);
      })
    );
  }
}
