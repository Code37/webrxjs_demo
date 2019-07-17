import {Component, Inject, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import {expand, flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [flyInOut(), expand()]
})

export class HomeComponent implements OnInit {

  dish: Dish;
  disherrMess: string;
  promoerrMess: string;
  leaderrMess: string;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(
      dish => this.dish = dish,
      errmess => this.disherrMess = errmess as any
  );
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion().subscribe(
      promotion => this.promotion = promotion,
      errmess => this.promoerrMess = errmess as any
    );
    // this.leader = this.leaderservice.getFeaturedLeader();
    this.leaderservice.getFeaturedLeader().subscribe(
      leader => this.leader = leader,
      errmess => this.leaderrMess = errmess as any
    );
  }

}
