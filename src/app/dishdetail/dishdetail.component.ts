import {Component, OnInit, Input, ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  @ViewChild('fform', { read: true, static: false }) commentFormDirective;

  dish: Dish;
  dishIds: string[];
  dishcopy: Dish;

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

  errMess: string;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private baseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
    // const id = this.route.snapshot.params.id;
    // this.dishservice.getDish(id).subscribe(
    //   dish => this.dish = dish,
    //   errmess => this.errMess = errmess as any);

    // this.dish = this.dishservice.getDish(id);

    this.dishservice.getDishIds().subscribe(
      dishIds => this.dishIds = dishIds,
      errmess => this.errMess = errmess as any
    );
    // This is for the picture slide route with image id.
    // this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params.id)))
    //   .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params.id))).subscribe(
        dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = errmess as any );
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
    // this.dish.comments.push(this.comment);

    // PUT HTTP method for dish
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy).subscribe(
      dish => { this.dish = dish; this.dishcopy = dish; },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = errmess as any; });

    // Reset the form
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
