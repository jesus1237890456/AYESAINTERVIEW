import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserRoutingModule } from './user-routing.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormIdentificateComponent } from './components/forms-user/form-identificate/form-identificate.component';
import { FormContactComponent } from './components/forms-user/form-contact/form-contact.component';
import { VisualUserComponent } from './components/visual-user/visual-user.component';
//modulo de usuario
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NewUserComponent,
    EditUserComponent,
    VisualUserComponent,
    UserListComponent,
    FormIdentificateComponent,
    FormContactComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule

  ]
})

export class UserModule { }
