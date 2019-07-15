import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
  // getLeaders(): Promise<Leader[]> {
  //   return new Promise(resolve=> {
  //     setTimeout(() => resolve(LEADERS), 2000)
  //   });
  // }
  //
  // getLeader(id: string): Promise<Leader> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedLeader(): Promise<Leader> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
  //   });
  // }

  // Promise

  // getLeaders(): Promise<Leader[]> {
  //   return Promise.resolve(LEADERS);
  // }
  //
  // getLeader(id: string): Promise<Leader> {
  //   return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  // }
  //
  // getFeaturedLeader(): Promise<Leader> {
  //   return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  // }

  // getLeaders(): Leader[] {
  //   return LEADERS;
  // }
  //
  // getLeader(id: string): Leader {
  //   return LEADERS.filter((leader) => (leader.id === id))[0];
  // }
  //
  // getFeaturedLeader(): Leader {
  //   return LEADERS.filter((leader) => leader.featured)[0];
  // }
}
