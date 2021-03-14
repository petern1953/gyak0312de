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
  orderText: string[] = ['DOWN', 'UP'];
  columnKey: string = '';
  // searchText: string = 'Search for / filter | sort by: ';
  searchText: string = '';
  // inputField: HTMLInputElement | null = new HTMLInputElement();
  inputField: HTMLInputElement | null = document.querySelector('input');

  constructor(private userService: UserService) {
    this.onColumnSelect('id');
    // this.inputField = document.querySelector('input');
  }

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
    if (this.columnKey === key) {
      this.changeOrder();
    } else {
      this.columnKey = key;
      this.order = 1;
      this.phrase = '';

      // console.log(this.phraseControl.value);

      this.inputField = document.querySelector('input');
      if (this.inputField) this.inputField.value = '';
    }
    // this.searchText = `Search for / filter | sort by: . . . ${
    this.searchText = `Sort >>> ${this.orderText[(this.order + 1) / 2]}WARD <<< by >>> ${
      this.columnKey
      } <<< (or choose another one)`;
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
}
