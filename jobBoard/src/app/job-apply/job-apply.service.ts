import { BehaviorSubject, Subject } from 'rxjs';
import { Job } from './../models/job';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobApplyService {
  private pJobInfos: Job = null;
  get jobInfos(): Job {
    return this.pJobInfos;
  }
  set jobInfos(v: Job) {
    this.pJobInfos = v;
    this.jobInfos$.next(v);
  }
  jobInfos$ = new BehaviorSubject<Job>(null);

  closeOverlay = new Subject();

  constructor() {}
}
