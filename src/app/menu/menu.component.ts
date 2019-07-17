import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import {expand, flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [flyInOut(), expand()]
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  // selectedDish: Dish = DISHES[0]; // first dish is chosen
  // selectedDish: Dish;

  constructor(private dishService: DishService,
              @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    // this.dishes = this.dishService.getDishes();
    // this.dishService.getDishes().then(dishes => this.dishes = dishes);
    // this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
    this.dishService.getDishes().subscribe(
      dishes => this.dishes = dishes,
      errmess => this.errMess = errmess as any);
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

}
