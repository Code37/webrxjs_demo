import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]> (baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }
  // Timeout version
  // getPromotions(): Observable<Promotion[]> {
  //   return of(PROMOTIONS).pipe(delay(2000));
  // }
  //
  // getPromotion(id: string): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
  // }
  //
  // getFeaturedPromotion(): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  // }
  // // Timeout version
  // getPromotions(): Promise<Promotion[]> {
  //   return new Promise(resolve => {
  //     setTimeout(()=> resolve(PROMOTIONS),2000);
  //   });
  // }
  //
  // getPromotion(id: string): Promise<Promotion> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedPromotion(): Promise<Promotion> {
  //   return new Promise(resolve => {
  //     setTimeout( () => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
  //   });
  // }

  // getPromotions(): Promise<Promotion[]> {
  //   return Promise.resolve(PROMOTIONS);
  // }
  //
  // getPromotion(id: string): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
  // }
  //
  // getFeaturedPromotion(): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  // }

  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }
  //
  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  // }
  //
  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }
}
