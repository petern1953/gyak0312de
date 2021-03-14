import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // user$: Observable<User> = this.activatedRoute.params.pipe(
  //   switchMap((params) => this.userService.get(params.id))
  // );
  user: User = new User();
  updating: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
      console.log(this.user);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.userService.get(params.id).subscribe((user) => {
        console.log(user);
        this.user = user;
      })
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.userService
      .update(this.user)
      .subscribe(() => this.router.navigate(['users']));
  }

  // onUpdate(form: NgForm, user: User): void {
  //   this.userService
  //     .update(user)
  //     .subscribe((user) => this.router.navigate(['']));
  // }

  // onUpdate(user: User): void {
  onUpdate(form: NgForm, user: User): void {
    this.updating = true;
    user.id = Number(user.id);
    console.log(user.id);
    if (user.id === 0) {
      this.userService.create(user).subscribe(() => {
        console.log('success');
      });
      this.updating = false;
      this.router.navigate(['users']);
    } else {
      this.userService.update(user).subscribe(() => {
        console.log('success');
      });
      this.updating = false;
      this.router.navigate(['users']);
    }
  }
}
