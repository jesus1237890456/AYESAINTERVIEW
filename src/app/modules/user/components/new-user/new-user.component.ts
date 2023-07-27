import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  //variables del componente
  public newUserForm: FormGroup = new FormGroup({});
 
  constructor(
    //servicios
    private userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
  }
 

  public onSendNewUser() {
    //metodo de creacion del usuario donde guarda la informacion y lo envia al back
    const identificate = this.newUserForm.controls['editUserFormIdentificate'].value;
   
    const contact = this.newUserForm.controls['editUserFormContact'].value;
    if (this.newUserForm.invalid) {
      return;
    }

    const user: User = {
      dni: identificate.dniControl,
      name: identificate.nombreControl,
      last_name: identificate.nombreLastControl,
      mail: contact.emailControl,
    };
    this.userService.createUser(user).subscribe({
      next: (idUser: User) => {
        user.id = idUser.id;
      },
      error: (err:HttpErrorResponse) => {
        if (err.status === 409) {
          this.message.error(
            'No se ha podido crear el usuario. Ya existe un usuario registrado' +

            {
              nzDuration: 10000,
            }
          );
        } else {
          this.message.error('No se ha podido crear el usuario.', {
            nzDuration: 10000,
          });
        }
      },
      complete: () => {
        this.message.success('Usuario creado correctamente y correo enviado', {
          nzDuration: 10000,
        });
        this.router.navigate(['/users']);
      },
    });
  }
//vuelve atras
  public clickVolver() {
    this.router.navigate(['/users']);
  }

 
}
