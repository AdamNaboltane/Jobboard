import { Job } from './../models/job';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private pjobList: Job[] = null;
  get jobList(): Job[] {
    return this.pjobList;
  }
  set jobList(v: Job[]) {
    this.pjobList = v;
    this.jobList$.next(v);
  }
  jobList$ = new BehaviorSubject<Job[]>(null);

  constructor(private database: DatabaseService) {}

  getAllJobs(): Observable<Job[]> {
    return this.database.getAllJobs().pipe(tap((v) => (this.jobList = v)));
  }

  getJobInfo(id: number): Observable<Job> {
    if (!!this.jobList) {
      const job = this.jobList.find((v) => {
        return v.id === id;
      });
      if (!!job) {
        return of(job);
      }
    }
    return this.database.getJobInfo(id);
  }

  postJob(app: Job): Observable<boolean> {
    return this.database.postJob(app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  deleteJob(id: number): Observable<boolean> {
    return this.database.deleteJob(id).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  updateJob(app: Job): Observable<boolean> {
    return this.database.putJob(app.id, app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }
}
