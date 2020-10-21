import { User } from '../models/user';
import { Job } from '../models/job';
import { Application } from '../models/application';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(environment.apiURL + 'login', data);
  }

  register(data: any): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'register', data);
  }

  //#region Jobs (Ads)
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(environment.apiURL + 'job');
  }

  getJobInfo(id: number): Observable<Job> {
    return this.http.get<Job>(environment.apiURL + `job/${id}`);
  }

  postJob(data: Job): Observable<Job> {
    return this.http.post<Job>(environment.apiURL + 'job', data);
  }

  putJob(id: number, data: Job): Observable<Job> {
    return this.http.put<Job>(environment.apiURL + `job/${id}`, data);
  }

  deleteJob(id: number): Observable<Job> {
    return this.http.delete<Job>(environment.apiURL + `job/${id}`);
  }
  //#endregion

  //#region Applications
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(environment.apiURL + 'app');
  }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(environment.apiURL + `app/${id}`);
  }

  postApplication(data: Application): Observable<Application> {
    return this.http.post<Application>(environment.apiURL + 'app', data);
  }

  deleteApplication(id: number): Observable<Application> {
    return this.http.delete<Application>(environment.apiURL + `app/${id}`);
  }

  putApplication(id: number, data: Application): Observable<Application> {
    return this.http.put<Application>(environment.apiURL + `app/${id}`, data);
  }
  //#endregion

  //#region Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + 'user');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/${id}`);
  }

  postUser(data: User): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'user', data);
  }

  putUser(id: number, data: User): Observable<User> {
    return this.http.put<User>(environment.apiURL + `user/${id}`, data);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.apiURL + `user/${id}`);
  }
  //#endregion

  //#region Company
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiURL + 'company');
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(environment.apiURL + `company/${id}`);
  }

  postCompany(data: Company): Observable<Company> {
    return this.http.post<Company>(environment.apiURL + 'company', data);
  }

  putCompany(id: number, data: Company): Observable<Company> {
    return this.http.put<Company>(environment.apiURL + `company/${id}`, data);
  }

  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(environment.apiURL + `company/${id}`);
  }
  //#endregion
}
