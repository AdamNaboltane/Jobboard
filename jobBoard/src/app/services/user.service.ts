import { BehaviorSubject, of, Observable, throwError } from 'rxjs';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pUserList: User[] = null;
  get userList(): User[] {
    return this.pUserList;
  }
  set userList(v: User[]) {
    this.pUserList = v;
    this.userList$.next(v);
  }
  userList$ = new BehaviorSubject<User[]>(null);

  constructor(private database: DatabaseService) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.database.login(data);
  }

  register(data: any): Observable<User> {
    return this.database.register(data);
  }

  getUser(id: number): Observable<User> {
    if (!!this.userList) {
      const user = this.userList.find((v) => {
        return v.id === id;
      });
      if (!!user) {
        return of(user);
      }
    }
    return this.database.getUser(id);
  }

  getAllUsers(): Observable<User[]> {
    return this.database.getAllUsers().pipe(tap((v) => (this.userList = v)));
  }

  postUser(app: User): Observable<boolean> {
    return this.database.postUser(app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.database.deleteUser(id).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  updateUser(app: User): Observable<boolean> {
    return this.database.putUser(app.id, app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }
}
