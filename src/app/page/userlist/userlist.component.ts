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

  order: number = 1;
  columnKey: string = '';
  searchText: string = 'Search for / filter | sort by';

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

  changeOrder(): void {
    console.log(this.order);
    this.order = -this.order;
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.changeOrder();
    this.searchText = 'Search for / filter | sort by ' + `${this.columnKey}`;
    // this.phrase = '';
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
}
