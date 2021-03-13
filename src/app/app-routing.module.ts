import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './page/userlist/userlist.component';
import { AdminComponent } from './page/admin/admin.component';


const routes: Routes = [
    {
    path: '',
    component: UserlistComponent
  },
  {
    path: 'user/:id',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
