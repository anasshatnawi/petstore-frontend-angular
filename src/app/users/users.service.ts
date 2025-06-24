import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../../lib/constans';
import { User } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = SERVER_URL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'getUsers');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'addUser', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}updateUser/${id}`, user);
  }

  deleteUser(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deleteUser/${id}`);
  }
}
