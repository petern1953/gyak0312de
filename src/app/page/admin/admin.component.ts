import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: User = new User();
  updating: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.userService.get(params.idOrName).subscribe((user) => {
        console.log(user);
        this.user = user || new User();
      })
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.userService
      .update(this.user)
      .subscribe(() => this.router.navigate(['users']));
  }
}
