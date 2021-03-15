# ANGULAR PROJEKT

Ebben a feladatban egy olyan angular projektet valósítunk meg, amely az alábbi feltételeket hívatott teljesíteni
- Új, létező git repóhoz kapcsolódik, annak gyökerébe települ.
- Bootstrapet és Font Awesome-ot használ.
- Home komponenst, két oldalkomponenst (userlist és admin) és egy navigációs menüt tartalmaz.
- Routing segítségével válthatunk az oldalak között.
- A Home komponensen egy Jumbotron található, benne egy linkkel, amely routinggal a lista oldalra vezet.
- Lista oldalon jeleníti meg az adatokat.
- Egyetlen entitással dolgozik (User).
- Az adatok json-serverből érkeznek.
- A json-állományt mockaroo-val generáljuk.
- A listaoldalról módosítani és törölni tudunk usereket, új user felvételét indítani.
- Az új user felvétele az admin oldalon történik.

### Git Repository létrehozása README.MD-vel
Állítsd be, hogy létrejöjjön a README.MD! Ez azért kell, hogy klónozható legyen a repó.

### VSCode indítása, gyűjtő mappa megnyitása
Nyiss meg a VSCode-ban egy olyan mappát/könyvtárat, ahová majd klónozni tudod az imént létrehozott git repót!

### Repo klónozása
```
git clone projectrepo-url
```

### Belépés a mappába és beállítás rootnak
```
cd projectname
code . -r
```

### README.MD törlése
Azért kell törölni a README.MD-t, mert a projekt root-jába szeretnénk létrehozni az angular projektünket, ekkor viszont létrejön egy új README.MD, és hibát okozna, ha az még létezne.

### Új Angular projekt létrehozása - több perc lehet
```
ng new --name="projectname" --directory . --style scss --routing true --strict
```
A kapcsolók, paraméterek jelentése sorban:
--name="project-test" - így adjuk meg a projekt nevét, amelyben a-z vagy - karakterek szerepelhetnek
--directory . - így állítjuk be, hogy a projekt abban a mappában jöjjön létre, ahol épp állunk a vscode-ban (root)
--style scss - így állítjuk be, hogy scss-t használjon (lehet css, vagy sass is)
--routing true - így kapcsoljuk be a rtoutingot
--strict - így kapcsoljuk be a strict módot

### Bootstrap, Font-Awesome és jQuery telepítése
```
npm i bootstrap font-awesome jquery
```

### Bootstrap, Font-Awesome és jQuery bekötése a projektbe
into: angular.json
```
"styles": [
    "./node_modules/bootstrap/dist/css/bootstrap.min.css", 
    "./node_modules/font-awesome/css/font-awesome.min.css", 
    "src/styles.scss"
],
"scripts": [
    "./node_modules/jquery/dist/jquery.js", 
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

### Projekt indításnál nyissa meg azt a böngészőben
into: package.json
```
"start": "ng serve -o",
```

### Első teszt futtatás
```
npm start
```
Itt megkérdezi, hogy hozzájárulsz-e adatok küldéséhez. Választhatjuk a "No"-t is.
Megnyílik az alkalmazás a böngészőben angular alapértelmezett tartalommal.
Sikeres futtatás után a folyamat ki is lőhető.

### Főoldal design felépítése
into: app.component.html

Ehhez érdemes feltenni a Bootstrap 4, Font awesome 4 kiegészítőt Ashok Koyi-tól!
A html teljes tartalmát töröljük, majd felépítjük a kívánt komponenseket.
Bootstrap navbar (megfelelő mepüpontokkal)
Koji kiegészítővel: b4-navbar-default
container > row > col a tartalomnak, benne Jumbotron a megfelelő tartalommal
Koji kiegészítővel: b4-jumbotron-default

### Komponensek létrehozása
Home komponens 
Oldal komponensek (userlist, admin) - page mappa (p.l: home)
Egyéb komponensek - common mappa (pl.: navigation, product-list)
```
ng g c home/home
ng g c common/navigation
ng g c page/userlist
ng g c page/admin
```
A létrehozott komponensek az app-module.ts-ben is bejegyződnek. Fontos! Ha valami ok miatt törölnünk kell egy komponenst, innen is el kell távolítanunk; nem elég a fájlok törlése.

### Főoldal HTML tartalmának kiszervezése komponensekbe (előkészülés a routingra)
- navbar -> navigation, helyére: <app-navigation></app-navigation>
- jumbotron -> home, helyére: <router-outlet></router-outlet>

### Routing a navbar-ban
into: navigation.component.html

<a> elemben ```href=""``` helyett ```routerLink="/"```

### Routing - aktív link class
into: navigation.component.html, navigation.component.scss (??)

Ahhoz, hogy az aktív link kapjon egy egyedi css class-t fel kell vegyük az alábbi attribútumot a linkekre:
```
routerLinkActive="active"
```
A "link-active" class megjelenését a komponens scss-ében hetározzuk meg egyénileg, ízlés szerint.
Ebben az állapotban a Home mindig megkapja az active class-t. Ahhoz, hogy ez ne így legyen, vizsgálni kell a teljes egyezést az alábbi módon:
```
[routerLinkActiveOptions]="{exact:true}"
```

### Routing 
into: app-routing.module.ts

Résztvevő komponensek importálása
```
import { Routes, RouterModule } from '@angular/router';

import { UserlistComponent } from './page/userlist/userlist.component';
import { AdminComponent } from './page/admin/admin.component';
import { HomeComponent } from './home/home.component';
```

### Routing - routes tömbben útvonalak felvétele
into: app-routing.module.ts
```
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserlistComponent,
  },
  {
    path: 'users/:id',
    component: AdminComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
```

### Lista komponens nézetének felépítése - html
into: userlist.component.html

Kitöröljük a teljes html tartalmat, majd elhelyezünk egy táblázatot
Koyi kiegészítővel: b4-table-default
```

### Osztály létrehozása
Osztály létrehozása:
```
ng g class model/user
```
Osztály felépítése:
```
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  featured: boolean = true;
  active: boolean = true;
```

### Json fájl létrehozása mockaroo-val
https://www.mockaroo.com

### Json-fájl elhelyezése és szerkesztése
Az src mappán kívül, azzal egy szinten létrehozunk egy server mappát, majd belehelyezzük a generált és letöltött json-fájlunkat. A fájl neve legyen db.json! A tartalmát egészítsük ki az alábbi módon:
```
{
  "users": ...
}
```

### HttpClientModule felvétele
into: app.module.ts
```
import { HttpClientModule } from '@angular/common/http'; 
```
Az imports résznél is fel kell venni!

### Service létrehozása
```
ng g service service/user
```

### Service - modulok, osztály importálása
érintett fájl: service/user.service.ts

Szükségünk lesz a Product osztályra, valamint a HttpClient modulra, továbbá az rxjs-ből a BehaviorSubject-re és a Observable-re.
```
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
```

### Service - constructorba injektálni a HTTPClient-et
into: service/user.service.ts
```
constructor(private http: HttpClient) { }
```

### Service - apiUrl és lista felvétele
érintett fájl: service/product.service.ts
```
apiUrl: string = 'http://localhost:3000/products';
list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
```

### Service - getAll és remove metódusok
into: service/user.service.ts

Mivel a feladatban egy lista komponensre számítunk, ezért ehhez szükség lesz egy getAll() metódusra.
A listán soronként elhelyezhetünk egy törlés gombot is, amely működtetéséhez egy remove() metódus is kelleni fog.
```
  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      users => this.userList$.next(users)
    );
  }

  remove(user: User): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
  }
```

### Userlist page component ts importálások
into: pages/userlist.component.ts
```
import { BehaviorSubject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from '../../service/user.service';
```

### Userlist page component lista felvétele, service injektálás, getAll() meghívása
érintett fájl: pages/userlist.component.ts
```
userList$: BehaviorSubject<User[]> = this.userService.list$;

  constructor(private userService: UserService) {
    this.onColumnSelect('id');
  }

  ngOnInit(): void {
    this.userService.getAll();
    this.phraseControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((newValue) => (this.phrase = newValue));
  }
```

### Userlist component html - táblázatsorok generálása és adat interpoláció
into: common/userlist.component.html
```
        <tr *ngFor="let user of userList$ | async | filter:phrase:columnKey | sorter:columnKey:order">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.ip_address }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.rights }}</td>
          <td>
            <div class="btn-group">
            <button [routerLink]="[user.id]" class="btn btn-info">
              <i class="fa fa-refresh"></i>
            </button>
            <button (click)="onDelete(user.id)" class="btn btn-danger">
              <i class="fa fa-trash"></i>
            </button>
            </div>
          </td>
        </tr>
```

### Törlés gomb elhelyezése
into: common/userlist.component.html

A thead-ben létrehozunk egy új cellát a végén (ld fent)
```
<th></th>
```
A tbody-ban szintén létrehozunk egy új cellát a végén, törlés gombbal. (ld fent)
```
<td>
  <button type="button" class="btn btn-danger">
    <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
</td>
```
eddig kb. ok

### Products oldal komponens törlés metódusa - ts
érintett fájl: pages/products.component.ts

Szükségünk lesz egy törlés metódusra a lista oldal komponensben, amely feliratkozik a service-ünk remove metódusára.
A táblázaton nem ezt a metódust fogjuk direktben meghívni, mert nem itt van a lista képezve, hanem a gyermek userlist komponensben.
```
deleteItem(product: Product): void {
  this.productService.remove(product).subscribe(
    () => {
      this.productService.getAll();
    }
  );
}
```
A feliratkozásban meghívjuk a getAll() metódust is, hogy ezzel újra generáljuk a törlést követően a listát, így a táblázatot is.

### Product-list komponens törlés metódusa - ts
érintett fájl: common/product-list.component.ts

Szükségünk lesz a lista komponensben is egy törlés metódusra. Tulajdonképpen ezt fogjuk meghívni a gombra kattintáskor.
```
onDelete(product: Product): void {
  this.delete.emit(product);
}
```
Ehhez emittálnunk kell, azaz tovább kell küldenünk a click eseményt.
```
@Output() delete: EventEmitter<Product> = new EventEmitter();
```

### Product-list komponens törlés metódusa - html
érintett fájl: common/product-list.component.html

A gomb elemünkre event-bindinggal bekötjük a komponens törlés metódusát és átadjuk neki a sorban szereplő product-ot.
```
(click)="onDelete(product)"
```

### Products oldal komponens törlés metódusa - html
érintett fájl: pages/products.component.html

A product-list szelektorára event-bindiggal ráaggatjuk a törlés metódusát, átadva neki az emittelt eseményt.
Ezzel tudjuk felpumpálni az adatokat egy gyermek komponesból a szülő számára.
```
(delete)="deleteItem($event)"
```
