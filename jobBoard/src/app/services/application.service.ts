import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Application } from '../models/application';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private pApplicationList: Application[] = null;
  get applicationList(): Application[] {
    return this.pApplicationList;
  }
  set applicationList(v: Application[]) {
    this.pApplicationList = v;
    this.applicationList$.next(v);
  }
  applicationList$ = new BehaviorSubject<Application[]>(null);

  constructor(private database: DatabaseService) {}

  getAllApplications(): Observable<Application[]> {
    return this.database
      .getAllApplications()
      .pipe(tap((v) => (this.applicationList = v)));
  }

  getApplicationsForJob(jobId: number): Application[] {
    if (!!this.applicationList) {
      return this.applicationList.filter((v) => v.id_ad === jobId);
    }
  }

  postApplication(app: Application): Observable<boolean> {
    return this.database.postApplication(app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  deleteApplication(id: number): Observable<boolean> {
    return this.database.deleteApplication(id).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  updateApplication(app: Application): Observable<boolean> {
    return this.database.putApplication(app.id, app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }
}
