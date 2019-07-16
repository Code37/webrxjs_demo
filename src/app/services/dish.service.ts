import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// tslint:disable-next-line:import-spacing
import  { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  // }

  // Timeout version
  // getDishes(): Promise<Dish[]> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }
  //
  // getDish(id: string): Promise<Dish> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   });
  // }
  // Promise
  // getDishes(): Promise<Dish[]> {
  //   return Promise.resolve(DISHES);
  // }
  //
  // getDish(id: string): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }
  // getDishes(): Dish[] {
  //   return DISHES;
  // }
  //
  // getDish(id: string): Dish {
  //   return DISHES.filter((dish) => (dish.id === id))[0];
  // }
  //
  // getFeaturedDish(): Dish {
  //   return DISHES.filter((dish) => dish.featured)[0];
  // }
}
