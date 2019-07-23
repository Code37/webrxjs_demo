import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {MarketPrice} from './shared/market-price';
import {MarketStatusService} from './services/market-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'conFusion';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];
  MarketStatuserrMess: string;

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(this.marketStatus.length - 20, this.marketStatus.length);
  }

  constructor(private marketStatusSvc: MarketStatusService) {

    this.marketStatusSvc.getInitialMarketStatus()
      .subscribe(
        prices => {
          // console.log(prices);
          this.MarketStatus = prices;
          // when we try to get the price in the first time,
          // setup a connection to the server to get the latest data through socket.io
          // and then concat the data with previous one.
          const marketUpdateObservable =  this.marketStatusSvc.getUpdates(); // 1
          marketUpdateObservable.subscribe(
            (latestStatus: MarketPrice) => {
              this.MarketStatus = this.marketStatus.concat(latestStatus);  // 3
            }
          );
        },
        errmess => this.MarketStatuserrMess = errmess as any
    );
  }
}
