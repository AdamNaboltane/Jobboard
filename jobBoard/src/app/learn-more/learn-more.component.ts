import { Company } from './../models/company';
import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { Job } from './../models/job';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { JobService } from '../services/job.service';
import { ApplicationService } from '../services/application.service';
import { Application } from '../models/application';
import { Subscription } from 'rxjs';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss'],
})
export class LearnMoreComponent implements OnInit, OnDestroy {
  jobInfos: Job = null;
  companyInfos: Company = null;

  subscriptions: Subscription[] = [];

  constructor(
    private job: JobService,
    private company: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap((val) => this.job.getJobInfo(+val.id)))
      .subscribe((v: Job) => {
        this.jobInfos = v;
        this.subscribeToServices();
      });
  }

  subscribeToServices(): void {
    this.subscriptions.push(
      this.company.getCompany(this.jobInfos.id_company).subscribe((v) => {
        this.companyInfos = v;
      })
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
