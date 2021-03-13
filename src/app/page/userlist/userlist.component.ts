import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  userList$: BehaviorSubject<User[]> = this.userService.list$;

  phraseControl: FormControl = new FormControl('');
  phrase: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll();
    this.phraseControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((newValue) => (this.phrase = newValue));
  }

  onDelete(id: number): void {
    this.userService.remove(id);
  }
}
