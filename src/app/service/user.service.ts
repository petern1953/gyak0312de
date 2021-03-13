import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/users';

  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getAll(): void {
    this.list$.next([]);
    this.http
      .get<User[]>(this.apiUrl)
      .subscribe(users => this.list$.next(users));
  }

  get(id: number | string): Observable<User> {
    id = parseInt('' + id, 10);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: User): void {
    this.http
      .post<User>(this.apiUrl, user)
      .subscribe(() => this.getAll());
  }

  update(user: User): Observable<User> {
    return this.http
      .patch<User>(`${this.apiUrl}/${user.id}`, user)
      .pipe(tap(() => this.getAll()));
  }

  remove(user: User): void {
    this.http
      .delete<User>(`${this.apiUrl}/${user.id}`)
      .subscribe(() => this.getAll());
  }
}
