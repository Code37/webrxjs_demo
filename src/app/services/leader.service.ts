import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }

  // getLeaders(): Observable<Leader[]> {
  //   return of(LEADERS).pipe(delay(2000));
  // }
  //
  // getLeader(id: string): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  // }
  //
  // getFeaturedLeader(): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  // }
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
