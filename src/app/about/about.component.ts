import {Component, Inject, OnInit} from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import {expand, flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderservice: LeaderService,
              @Inject('BaseURL') private baseURL) {}

  ngOnInit() {
    // this.leaders = this.leaderservice.getLeaders();
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders);
  }
}
