import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: User[] | null, phrase: string, key: string): any {
    if (!Array.isArray(value) || !phrase || !key) return value;

    if (key == 'id') return value.filter((item) => '' + item.id == phrase);

    let lcPhrase = ('' + phrase).toLowerCase();
    if (
        key === "first_name" ||
        key === "last_name" ||
        key === "gender" ||
        key === "email" ||
        key === "ip_address" ||
        key === "position" ||
        key === "rights"
      )
//  return value.filter((item) =>
//  {
//    if (('' + item[key]).toLowerCase().includes(lcPhrase))
//    {
//      console.log(
//          item,
//          key,
//          item[key],
//          lcPhrase,
//          ('' + item[key]).toLowerCase().includes(lcPhrase)
//        );
//       }
//         return ('' + item[key]).toLowerCase().includes(lcPhrase);
//       }
//     );
//   }
 return value.filter((item) => ('' + item[key]).toLowerCase().includes(lcPhrase));
  }
}
