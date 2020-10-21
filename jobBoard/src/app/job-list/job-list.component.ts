import { Job } from './../models/job';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize = 10;
  sliceStart = 0;
  sliceEnd = this.sliceStart + this.pageSize;
  jobList: Job[] = null;
  subscriptions = [];

  constructor(private job: JobService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.job.getAllJobs().subscribe(),
      this.job.jobList$.subscribe((v: Job[]) => {
        this.jobList = v;
      })
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((page) => {
      this.pageSize = page.pageSize;
      this.sliceStart = page.pageIndex * this.pageSize;
      this.sliceEnd = this.sliceStart + this.pageSize;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
