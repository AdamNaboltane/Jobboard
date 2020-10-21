import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { DatabaseService } from './database.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private pCompanyList: Company[] = null;
  get companyList(): Company[] {
    return this.pCompanyList;
  }
  set companyList(v: Company[]) {
    this.pCompanyList = v;
    this.companyList$.next(v);
  }
  companyList$ = new BehaviorSubject<Company[]>(null);

  constructor(private database: DatabaseService) {}

  getAllCompanies(): Observable<Company[]> {
    return this.database
      .getAllCompanies()
      .pipe(tap((v) => (this.companyList = v)));
  }

  getCompany(id: number): Observable<Company> {
    if (!!this.companyList) {
      const user = this.companyList.find((v) => {
        return v.id === id;
      });
      if (!!user) {
        return of(user);
      }
    }
    return this.database.getCompany(id);
  }

  postCompany(app: Company): Observable<boolean> {
    return this.database.postCompany(app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  deleteCompany(id: number): Observable<boolean> {
    return this.database.deleteCompany(id).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }

  updateCompany(app: Company): Observable<boolean> {
    return this.database.putCompany(app.id, app).pipe(
      map((v) => !!v),
      catchError((err) => throwError(err))
    );
  }
}
