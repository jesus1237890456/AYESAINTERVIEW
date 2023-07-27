import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from '../auth/components/register-user/register-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VisualUserComponent } from './components/visual-user/visual-user.component';

//rutas de usuario
const routes: Routes = [
  { path: "", component: UserListComponent, pathMatch: "full"},
  { path: "edituser/:userId", component: EditUserComponent },
  { path: "newuser", component: NewUserComponent },
 { path: "register", component: RegisterUserComponent},
 { path: "visualuser/:userId", component: VisualUserComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
