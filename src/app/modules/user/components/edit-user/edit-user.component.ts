import { editParam } from './../../../../shared/interfaces/editentity.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserOne } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
//variables del componente
  activateForm: boolean = false;
  public editUserForm: FormGroup = new FormGroup({});
  editUser!: User;
  activationParam: editParam = {
    id: 0,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private message: NzMessageService
  ) {}

  get f() {
    return this.editUserForm.controls;
  }

  ngOnInit(): void {
    //falso refresco del componente
    this.activateForm = false;
//obtencion del id por ruta
    this.activationParam = {
      id: this.routeActivated.snapshot.params.userId,
    };
  //llamada al metodo de obtencion de un usuario por id
    this.userService.getUser(this.activationParam.id).subscribe({
      next: (dataUser: UserOne) => {
        this.editUser = dataUser.user;
      },
      complete: () => {
        this.activateForm = true;
      },
    });
  }
//metodo para volver atras
  public clickVolver() {
    this.router.navigate(['/users', this.activationParam.id]);
  }
  public onSendEditUser() {
    //metodo para actualizar el usuario donde se guardan los datos del formulario, y si son correctos se envian
    const identificate = this.editUserForm.controls['editUserFormIdentificate'].value;
   
    const contact = this.editUserForm.controls['editUserFormContact'].value;

    if (this.editUserForm.invalid) {
      return;
    }

    const user: User = {
      id: this.activationParam.id,
      dni: identificate.dniControl,
      name: identificate.nombreControl,
      last_name: identificate.nombreLastControl,
      mail: contact.emailControl,
    };

    this.userService.updateUser(user).subscribe({
      next: (data: User) => {},
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.message.error(
            'No se ha podido actualizar el usuario. Ya existe un usuario registrado ' +
            
            {
              nzDuration: 10000,
            }
          );
        } else {
          this.message.error('No se ha podido actualizar el usuario.', {
            nzDuration: 10000,
          });
        }
      },
      complete: () => {
        this.message.success('Usuario actualizado correctamente.', {
          nzDuration: 10000,
        });
        this.router.navigate(['/users']);
      },
    });
  }
}
