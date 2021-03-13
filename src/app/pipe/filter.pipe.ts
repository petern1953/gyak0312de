import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: User[] | null, phrase: string, key: string | number): any {
    if (!Array.isArray(value) || !phrase || !key) return value;

    if (key == 'id') return value.filter((item) => '' + item.id == phrase);

    // let lcPhrase = ('' + phrase).toLowerCase();
    // return value.filter(item =>
    //
    // ezt meg kell nézni, miért nem jó neki item[key]
    //   ('' + item[key]).toLowerCase().includes(lcPhrase)
    // );
  }
}
