import { Injectable } from '@angular/core';
import {MarketPrice} from '../shared/market-price';
import {HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {Observable, from, Subject} from 'rxjs';
import * as socketIo from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})

export class MarketStatusService {

  constructor(private http: HttpClient) { }

  getInitialMarketStatus(): Observable<MarketPrice[]> {
    return this.http.get<MarketPrice[]>(baseURL + 'marketPositions');
  }

  getUpdates() {
    const socket = socketIo(baseURL);
    // console.log(socket);
    const marketSub = new Subject<MarketPrice>();
    const marketSubObservable = from(marketSub);

    socket.on('market', (marketStatus: MarketPrice) => {
      // socket.emit('market', (data) => {
      //   console.log(data);
      // });
      marketSub.next(marketStatus);
    });
    // socket.on('market', (data) => {
    //   console.log('Received data');
    //   console.log(data);
    // });

    return marketSubObservable;
  }
}
