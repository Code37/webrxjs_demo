import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

// const DISH = {
//   id: '0',
//   name: 'Uthappizza',
//   image: '/assets/images/uthappizza.png',
//   category: 'mains',
//   featured: true,
//   label: 'Hot',
//   price: '4.99',
//   tslint:disable-next-line:max-line-length
//   description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
//   comments: [
//     {
//       rating: 5,
//       comment: 'Imagine all the eatables, living in conFusion!',
//       author: 'John Lemon',
//       date: '2012-10-16T17:57:28.556094Z'
//     },
//     {
//       rating: 4,
//       comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
//       author: 'Paul McVites',
//       date: '2014-09-05T17:57:28.556094Z'
//     },
//     {
//       rating: 3,
//       comment: 'Eat it, just eat it!',
//       author: 'Michael Jaikishan',
//       date: '2015-02-13T17:57:28.556094Z'
//     },
//     {
//       rating: 4,
//       comment: 'Ultimate, Reaching for the stars!',
//       author: 'Ringo Starry',
//       date: '2013-12-02T17:57:28.556094Z'
//     },
//     {
//       rating: 2,
//       comment: 'It\'s your birthday, we\'re gonna party!',
//       author: '25 Cent',
//       date: '2011-12-02T17:57:28.556094Z'
//     }
//   ]
// };

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  @ViewChild('fform', { read: true, static: false }) commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  // comment variable
  commentForm: FormGroup;
  comment: Comment;

  private formErrors = {
    author: '',
    comment: ''
  };

  validationMessages = {
    author: {
      required:      'First Name is required.',
      minlength:     'First Name must be at least 2 characters long.',
      maxlength:     'FirstName cannot be more than 25 characters long.'
    },
    comment: {
      required:      'Comment is required.',
    },
  };

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
    // this.dish = this.dishservice.getDish(id);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params.id)))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm() {
    // comment form initialization
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: 5,
      comment: ['', [Validators.required] ],
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
